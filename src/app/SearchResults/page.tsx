import { Query } from "@/lib";
import CategoryFilters from "@/components/CategoryFilters";
import RoomComponent from "@/components/RoomList";

async function getHotels(country: string | null) {
	const query = country
		? "SELECT * FROM Hotel WHERE country = ?"
		: "SELECT * FROM Hotel";
	const results = await Query(query, [country]);
	return results;
}

export default async function SearchResults({
	searchParams,
}: {
	searchParams: {
		startDate: string;
		endDate: string;
		country: string;
	};
}) {
	const startDate = new Date(searchParams.startDate);
	const endDate = new Date(searchParams.endDate);
	const country = searchParams.country;

	const hotels: any = await getHotels(country);

	console.log(hotels);

	return (
		<>
			<CategoryFilters />

			{/* <h1>Search Results</h1>
			<ul>
				{hotels.map((hotel: any) => (
					<li key={hotel.HotelID}>{hotel.HotelName}</li>
				))}
			</ul> */}
		</>
	);
}
