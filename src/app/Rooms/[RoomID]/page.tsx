import { Query } from "@/lib";
import RoomOverview from "@/components/RoomOverview";

async function getRoom(id: number) {
	const query =
		"SELECT r.RoomID, r.HotelID, r.ChainID, h.HotelName, h.Street, h.City, h.PostalCode, h.Category, h.Country, r.Price, r.Capacity, r.View, r.image_href, r.Amenities\
    FROM Room r JOIN Hotel h ON r.HotelID = h.HotelID WHERE r.RoomID = ?";
	const results = await Query(query, [id]);
	return results;
}

async function getHrefs(id: number) {
	const qeury = "SELECT image_href FROM Room WHERE HotelID = ?";

	const results = await Query(qeury, [id]);

	return results;
}

async function getIssues(id: number) {
	const query = "SELECT * FROM Issue WHERE RoomID = ?";

	const results = await Query(query, [id]);

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

	const issues: any = await getIssues(parseInt(params.RoomID));

	return (
		<>
			<RoomOverview room={room[0]} hrefs={hrefs ? hrefs : []} issues={issues} />
		</>
	);
}
