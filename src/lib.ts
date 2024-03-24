"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { type Room, type Customer } from "./types";

import mysql from "mysql2/promise";
import { revalidatePath } from "next/cache";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("2h")
		.sign(key);
}

export async function Query(query: string, values: any[] = []) {
	const connection = await mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
	});

	try {
		const [results] = await connection.execute(query, values);

		connection.end();

		return results;
	} catch (error) {
		return { error };
	}
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function login(formData: FormData) {
	const { email, password } = Object.fromEntries(formData);

	const results: any = await Query("SELECT * FROM UserView WHERE email = ?", [
		email,
	]);

	const user = results[0];

	if (!user) {
		return { error: "User" };
	}

	if (user.Password !== password) {
		return { error: "Password" };
	}

	const expires = new Date(Date.now() + 3600 * 1000);
	const session = await encrypt({ user, expires });

	cookies().set("session", session, { expires, httpOnly: true });

	return;
}

export async function logout() {
	try {
		cookies().set("session", "", { expires: new Date(0) });
		return;
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}

export async function addUser(formData: FormData) {
	const {
		firstname,
		lastname,
		email,
		password,
		confirmpassword,
		city,
		region,
		postalcode,
		ssn,
		streetaddress,
	} = Object.fromEntries(formData);

	const query =
		"INSERT INTO Customer (Name, Email, Password, RegistrationDate, SSN, Address, Role) VALUES (?, ?, ?,?, ?, ?, ?)";

	try {
		const results: any = await Query(query, [
			`${firstname} ${lastname}`,
			email,
			password,
			new Date(),
			ssn,
			`${streetaddress}, ${city}, ${region}, ${postalcode}`,
			"Customer",
		]);

		const user = {
			ID: results.insertId,
			Name: `${firstname} ${lastname}`,
			Email: email,
			Password: password,
			RegistrationDate: new Date(),
			SSN: ssn,
			Address: `${streetaddress}, ${city}, ${region}, ${postalcode}`,
			Role: "Customer",
		};

		const expires = new Date(Date.now() + 3600 * 1000);
		const session = await encrypt({ user, expires });

		cookies().set("session", session, { expires, httpOnly: true });
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function updateUser(user: Customer) {
	const query =
		"UPDATE Customer SET Name = ?, Address = ?, RegistrationDate = ?, SSN = ?, Email = ?, Password = ? WHERE ID = ?";
	const values = [
		user.Name,
		user.Address,
		new Date(user.RegistrationDate),
		user.SSN,
		user.Email,
		user.Password,
		user.ID,
	];

	try {
		const res = await Query(query, values);
		const expires = new Date(Date.now() + 3600 * 1000);
		const session = await encrypt({ user, expires });

		cookies().set("session", session, { expires, httpOnly: true });
		return { success: "User updated successfully!" };
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function makeBooking(
	room: Room,
	dates: { startDate: Date; endDate: Date }
) {
	const session = cookies().get("session")?.value;

	if (!session) {
		const booking = { room, dates };
		const expires = new Date(Date.now() + 3600 * 1000);
		cookies().set("booking", await encrypt({ booking, expires }), {
			expires,
			httpOnly: true,
		});
		return redirect("/Login");
	}

	const parsedSession = await decrypt(session);

	const user = parsedSession.user;

	const query =
		"INSERT INTO Booking (RoomID, HotelID, ChainID, BookingDate, StartDate, EndDate, CustomerID) VALUES (?, ?, ?, ?,?, ?, ?)";

	const values = [
		room.RoomID,
		room.HotelID,
		room.ChainID,
		new Date(),
		dates.startDate,
		dates.endDate,
		user.ID,
	];
	try {
		const results: any = await Query(query, values);
		return;
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function getBookings() {
	const session = await getSession();

	if (!session) {
		redirect("/login");
		return { error: "Not Logged In!" };
	}

	const user = session.user;

	const query = user?.HiringDate
		? `SELECT b.BookingID, 
					b.RoomID, 
					b.HotelID, 
					b.ChainID, 
					b.CustomerID, 
					b.EndDate, 
					b.BookingDate, 
					b.StartDate, 
					h.HotelName, 
					h.Street,
					h.City,
					h.PostalCode,
					h.Country,
					h.Category,
					r.Capacity,
					r.View,
					r.Extendable,
					r.Amenities,
					r.Price,
					r.image_href,
					i.IssueDescription
					FROM 
						Booking b
					JOIN 
						Hotel h ON b.HotelID = h.HotelID
					JOIN 
						Room r ON b.RoomID = r.RoomID
					LEFT JOIN 
						Issue i ON b.RoomID = i.RoomID;`
		: `SELECT 
					b.BookingID, 
					b.RoomID, 
					b.HotelID, 
					b.ChainID, 
					b.CustomerID, 
					b.EndDate, 
					b.BookingDate, 
					b.StartDate, 
					h.HotelName, 
					h.Street,
					h.City,
					h.PostalCode,
					h.Country,
					h.Category,
					r.Capacity,
					r.View,
					r.Extendable,
					r.Amenities,
					r.Price,
					r.image_href,
					i.IssueDescription
					FROM 
						Booking b
					JOIN 
						Hotel h ON b.HotelID = h.HotelID
					JOIN 
						Room r ON b.RoomID = r.RoomID
					LEFT JOIN 
						Issue i ON b.RoomID = i.RoomID
					WHERE
						b.CustomerID = ?;
					`;

	const results = await Query(query, [user.ID]);
	return results;
}

export async function getRentings() {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const user = session.user;

	const query = user?.HiringDate
		? `SELECT 
			r.RentingID, 
			r.RoomID, 
			r.HotelID, 
			r.ChainID, 
			r.CustomerID, 
			r.EndDate, 
			r.StartDate AS BookingDate, 
			r.StartDate, 
			h.HotelName, 
			h.Street,
			h.City,
			h.PostalCode,
			h.Country,
			h.Category,
			rm.Capacity,
			rm.View,
			rm.Extendable,
			rm.Amenities,
			rm.Price,
			rm.image_href,
			i.IssueDescription
		FROM 
			Renting r
		JOIN 
			Hotel h ON r.HotelID = h.HotelID
		JOIN 
			Room rm ON r.RoomID = rm.RoomID
		LEFT JOIN 
			Issue i ON r.RoomID = i.RoomID;`
		: `SELECT 
					r.RentingID, 
					r.RoomID, 
					r.HotelID, 
					r.ChainID, 
					r.CustomerID, 
					r.EndDate, 
					r.StartDate AS BookingDate, 
					r.StartDate, 
					h.HotelName, 
					h.Street,
					h.City,
					h.PostalCode,
					h.Country,
					h.Category,
					rm.Capacity,
					rm.View,
					rm.Extendable,
					rm.Amenities,
					rm.Price,
					rm.image_href,
					i.IssueDescription
				FROM 
					Renting r
				JOIN 
					Hotel h ON r.HotelID = h.HotelID
				JOIN 
					Room rm ON r.RoomID = rm.RoomID
				LEFT JOIN 
					Issue i ON r.RoomID = i.RoomID
				WHERE
					r.CustomerID = ?;`;

	const values = user?.HiringDate ? [] : [user.ID];
	const results = await Query(query, values);
	return results;
}

export async function createRenting(BookingID: number) {
	const query = `INSERT INTO Renting (CustomerID, RoomID, HotelID, ChainID, StartDate, EndDate)
					SELECT 
						b.CustomerID,
						b.RoomID,
						b.HotelID,
						b.ChainID,
						b.StartDate,
						b.EndDate
					FROM 
						Booking b
					WHERE 
						b.BookingID = ?;`;

	const values = [BookingID];

	try {
		const res = await Query(query, values);
		await Query("DELETE FROM Booking WHERE BookingID = ?;", [BookingID]);
		revalidatePath("/Bookings");
		return;
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function updateSession() {
	const session = cookies().get("session")?.value;
	if (!session) return;

	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + 10 * 1000);
	const res = NextResponse.next();

	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
}

export async function updateHotels(hotelInfoObj, updates) {
	const queries: any[][] = [];
	Object.entries(hotelInfoObj).forEach(([hotelName, hotelInfo]: [any, any]) => {
		if (updates.hasOwnProperty(hotelInfo.HotelID)) {
			updates[hotelInfo.HotelID].forEach((roomID: number) => {
				const room = hotelInfo.Rooms.find(
					(room: any) => room.RoomID === roomID
				);
				queries.push([
					"UPDATE Room SET Capacity = ?, View = ?, Amenities = ?, Price = ? WHERE RoomID = ?;",
					[room.Capacity, room.View, room.Amenities, room.Price, roomID],
				]);
			});
			queries.push([
				"UPDATE Hotel SET Street = ?, Category = ?, PhoneNumber = ? WHERE HotelID = ?;",
				[
					hotelInfo.Street,
					hotelInfo.Stars,
					hotelInfo.PhoneNumber,
					hotelInfo.HotelID,
				],
			]);
		}
	});
	try {
		queries.forEach(async (query) => {
			await Query(query[0], query[1]);
		});
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function addRoom({
	amenities,
	view,
	extendable,
	price,
	capacity,
	imagehref,
	hotelID,
	chainID,
}: {
	amenities: string;
	view: string;
	extendable: string;
	price: number;
	capacity: number;
	imagehref: string;
	hotelID: string;
	chainID: number;
}) {
	const query = `INSERT INTO Room (HotelID, ChainID, Price, Capacity, View, Amenities, Extendable, image_href)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
	const values = [
		hotelID,
		chainID,
		price,
		capacity,
		view,
		amenities,
		extendable === "Yes" ? 1 : 0,
		imagehref,
	];

	try {
		const res: any = await Query(query, values);
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function deleteRoom(RoomID: number, ChainID: number) {
	const query = `DELETE FROM Room WHERE RoomID = ?;`;
	const values = [RoomID];
	try {
		const res: any = await Query(query, values);
		revalidatePath(`/Chains/Edit/${ChainID}`);
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}
