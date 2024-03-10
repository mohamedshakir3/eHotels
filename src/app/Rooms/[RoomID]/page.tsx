import { Query } from "@/lib";
import RoomOverview from "@/components/RoomOverview";

async function getRoom(id: number) {
	const query =
		"SELECT r.RoomID, r.HotelID, h.HotelName, h.Street, h.City, h.PostalCode, h.Category, h.Country, r.Price, r.Capacity, r.View, r.image_href, r.Amenities\
    FROM Room r JOIN Hotel h ON r.HotelID = h.HotelID WHERE r.RoomID = ?";
	const results = await Query(query, [id]);
	return results;
}

async function getHrefs(id: number) {
	const qeury = "SELECT image_href FROM Room WHERE HotelID = ?";

	const results = await Query(qeury, [id]);

	return results;
}

export default async function RoomDetails({
	params,
}: {
	params: { RoomID: string };
}) {
	const room = await getRoom(parseInt(params.RoomID));

	const hotelID = room[0]?.HotelID;

	const hrefs: any = await getHrefs(hotelID);
	console.log(hrefs);
	return (
		<>
			{/* <h1>Room Details</h1>
			<p>{room[0].HotelName}</p>
			<p>{room[0].Street}</p>
			<p>{room[0].City}</p>
			<p>{room[0].PostalCode}</p>
			<p>{room[0].Country}</p>
			<p>{room[0].Price}</p>
			<p>{room[0].Capacity}</p>
			<p>{room[0].View}</p>
			<p>{room[0].Amenities}</p>
			<p>{room[0].image_href}</p> */}
			<RoomOverview room={room[0]} hrefs={hrefs ? hrefs : []} />
		</>
	);
}
