import { Query } from "@/lib";
import { type SearchQuery } from "@/types";
import CategoryFilters from "@/components/CategoryFilters";
import RoomComponent from "@/components/RoomList";

async function getRooms() {
	const query =
		"SELECT r.RoomID, r.HotelID, h.HotelName, h.Street, h.City, h.PostalCode, h.Country, r.Price, r.Extendable,h.Category, r.Capacity, r.View, r.image_href, r.Amenities FROM Room r JOIN Hotel h ON r.HotelID = h.HotelID;";
	const results = await Query(query);
	return results;
}

export default async function SearchResults({
	searchParams,
}: {
	searchParams: SearchQuery;
}) {
	const startDate = new Date(searchParams.startDate);
	const endDate = new Date(searchParams.endDate);
	const country = searchParams.country;

	const rooms: any = await getRooms();

	return (
		<>
			<CategoryFilters rooms={rooms} searchParams={searchParams} />

			{/* <h1>Search Results</h1>
			<ul>
				{hotels.map((hotel: any) => (
					<li key={hotel.HotelID}>{hotel.HotelName}</li>
				))}
			</ul> */}
		</>
	);
}
