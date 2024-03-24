import { Query, getSession } from "@/lib";
import EditHotels from "@/components/EditHotels";

async function getRoomsbyChainID(ChainID: string) {
	try {
		const query = `SELECT 
		h.HotelID,
		h.HotelName,
		h.ChainID,
		h.Street,
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
		h.ChainID = 3
		GROUP BY 
		h.HotelID, r.RoomID;`;

		const values = [ChainID];

		const res: any = await Query(query, values);

		const roomsByHotels = {};

		res.forEach((row) => {
			const hotelName = row.HotelName;
			if (!roomsByHotels.hasOwnProperty(hotelName)) {
				roomsByHotels[hotelName] = {
					ChainID: row.ChainID,
					HotelID: row.HotelID,
					Manager: row.ManagerName,
					Street: row.Street,
					Email: row.Email,
					PhoneNumber: row.PhoneNumber,
					Stars: row.Category,
					Rooms: [],
				};
			}
			const room = {
				RoomID: row.RoomID,
				Price: row.Price,
				Capacity: row.Capacity,
				View: row.View,
				Amenities: row.Amenities,
			};

			roomsByHotels[hotelName].Rooms.push(room);
		});

		return roomsByHotels;
	} catch (error) {
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
					<EditHotels hotelInfo={rooms} />
				</div>
			</div>
		</div>
	);
}
