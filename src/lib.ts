"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { type Room } from "./types";

import mysql from "mysql2/promise";
import { revalidatePath } from "next/cache";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrpyt(payload: any) {
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

	const results: any = await Query("SELECT * FROM Customer WHERE email = ?", [
		email,
	]);

	const user = results[0];

	if (!user) {
		return { error: "User not found" };
	}

	if (user.Password !== password) {
		return { error: "Password is incorrect" };
	}

	const expires = new Date(Date.now() + 10 * 1000);
	const session = await encrpyt({ user, expires });

	cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
	cookies().set("session", "", { expires: new Date(0) });
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
		"INSERT INTO Customer (CustomerName, Email, Password) VALUES (?, ?, ?)";

	try {
		const results: any = await Query(query, [
			`${firstname} ${lastname}`,
			email,
			password,
		]);

		const user = {
			CustomerID: results.insertId,
			CustomerName: `${firstname} ${lastname}`,
			Email: email,
			Password: password,
		};

		const expires = new Date(Date.now() + 10 * 1000);
		const session = await encrpyt({ user, expires });

		cookies().set("session", session, { expires, httpOnly: true });
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}

export async function makeBooking(
	room: Room,
	dates: { startDate: Date; endDate: Date }
) {
	const session = cookies().get("session")?.value;

	if (!session) return { errror: "Not Logged In!" };

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
		user.CustomerID,
	];

	const results = await Query(query, values);
}

export async function updateSession() {
	const session = cookies().get("session")?.value;
	if (!session) return;

	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + 10 * 1000);
	const res = NextResponse.next();

	res.cookies.set({
		name: "session",
		value: await encrpyt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
}
