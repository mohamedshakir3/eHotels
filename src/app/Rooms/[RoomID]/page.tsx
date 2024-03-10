import { Query } from "@/lib";

async function getRoom(id: number) {
    const query = "SELECT r.RoomID, r.HotelID, h.HotelName, h.Street, h.City, h.PostalCode, h.Country, r.Price, r.Capacity, r.View, r.image_href, r.Amenities\
    FROM Room r JOIN Hotel h ON r.HotelID = h.HotelID WHERE r.RoomID = ?"
    const results = await Query(query, [id]);
    return results;
}

export default async function RoomDetails({
	params,
}: {
	params: { RoomID: string };
}) {
    const room = await getRoom(parseInt(params.RoomID));

    console.log(room);

	return (
        <>
            <h1>Room Details</h1>
            <p>{room[0].HotelName}</p>
            <p>{room[0].Street}</p>
            <p>{room[0].City}</p>
            <p>{room[0].PostalCode}</p>
            <p>{room[0].Country}</p>
            <p>{room[0].Price}</p>
            <p>{room[0].Capacity}</p>
            <p>{room[0].View}</p>
            <p>{room[0].Amenities}</p>
            <p>{room[0].image_href}</p>
        </>

    )
}
