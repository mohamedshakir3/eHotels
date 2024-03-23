import { Query, getSession } from "@/lib";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";

import {
	BriefcaseIcon,
	MapPinIcon,
	AtSymbolIcon,
	PhoneIcon,
	StarIcon,
} from "@heroicons/react/20/solid";

import Link from "next/link";

async function getRoomsbyChainID(ChainID: string) {
	try {
		const query = `SELECT 
		h.HotelID,
		h.HotelName,
		h.Street,
		h.City,
		h.PostalCode,
		h.Country,
		r.RoomID,
		r.Price,
		h.Email,
		h.ManagerID,
		h.Category,
		e.Name AS ManagerName,	
		h.PhoneNumber,
		r.Capacity,
		r.View,
		r.Amenities
		FROM 
		Hotel h
		JOIN 
		Room r ON h.HotelID = r.HotelID
		JOIN 
		Employee e ON h.ManagerID = e.ID
		WHERE 
		h.ChainID = ?
		GROUP BY 
		h.HotelID, r.RoomID;`;

		const values = [ChainID];

		const res: any = await Query(query, values);

		const roomsByHotels = {};

		res.forEach((row) => {
			const hotelName = row.HotelName;
			const room = {
				Address: `${row.Street}, ${row.City}, ${row.PostalCode}, ${row.Country}`,
				RoomID: row.RoomID,
				Price: row.Price,
				Capacity: row.Capacity,
				Manager: row.ManagerName,
				Stars: row.Category,
				Email: row.Email,
				PhoneNumber: row.PhoneNumber,
				View: row.View,
				Amenities: row.Amenities,
			};
			if (!roomsByHotels[hotelName]) {
				roomsByHotels[hotelName] = [];
			}
			roomsByHotels[hotelName].push(room);
		});

		return roomsByHotels;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export default async function RoomDetails({
	params,
}: {
	params: { ChainID: string };
}) {
	const rooms: any = await getRoomsbyChainID(params.ChainID);

	const session = await getSession();

	let user: any = null;

	if (session) {
		user = session.user;
	}
	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 mb-3">
					<div className="flex items-center justify-between border-b border-gray-200 py-6">
						<h1 className="text-2xl font-semibold leading-tight text-gray-900">
							Hotel Chains Information
						</h1>
						{user?.HiringDate ? (
							<Link href={`Edit/${params.ChainID}`}>Edit</Link>
						) : null}
					</div>
					{Object.entries(rooms).map(([hotelName, rooms]: any) => (
						<>
							<div className="min-w-0 flex-1">
								<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
									{hotelName}
								</h2>
								<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
									<div className="mt-2 flex items-center text-sm text-gray-500">
										<BriefcaseIcon
											className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										Manager: {rooms[0].Manager}
									</div>
									<div className="mt-2 flex items-center text-sm text-gray-500">
										<MapPinIcon
											className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										{rooms[0].Address}
									</div>
									<div className="mt-2 flex items-center text-sm text-gray-500">
										<AtSymbolIcon
											className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										{rooms[0].Email}
									</div>
									<div className="mt-2 flex items-center text-sm text-gray-500">
										<PhoneIcon
											className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										{rooms[0].PhoneNumber}
									</div>
									<div className="mt-2 flex items-center text-sm text-gray-500">
										<StarIcon
											className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										{rooms[0].Stars}
									</div>
								</div>
							</div>
							<TableContainer>
								<Table variant="striped" colorScheme="pink">
									<TableCaption>
										List of Rooms for hotel {hotelName}.
									</TableCaption>
									<Thead>
										<Tr>
											<Th isNumeric>RoomID</Th>
											<Th>Amenities</Th>
											<Th>View</Th>
											<Th isNumeric>Capacity</Th>
											<Th isNumeric>Price</Th>
										</Tr>
									</Thead>
									<Tbody>
										{rooms.map((room) => (
											<Tr key={room.RoomID}>
												<Td>{room.RoomID}</Td>
												<Td>{room.Amenities}</Td>
												<Td>{room.View}</Td>
												<Td isNumeric>{room.Capacity}</Td>
												<Td isNumeric>${room.Price}</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</TableContainer>
						</>
					))}
				</div>
			</div>
		</div>
	);
}
