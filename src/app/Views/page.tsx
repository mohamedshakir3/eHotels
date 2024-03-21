import { Query } from "@/lib";
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
async function getViews() {
	const availableRooms = await Query("SELECT * FROM AvailableRoomsPerAreaView");
	const hotelCapacities = await Query(
		"SELECT * FROM AggregatedCapacityPerHotelView"
	);

	return { availableRooms, hotelCapacities };
}

export default async function Views() {
	const { availableRooms, hotelCapacities }: any = await getViews();
	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 mb-3">
					<h2 className="text-2xl font-bold text-gray-900">
						Available Rooms Per Area View
					</h2>
					<TableContainer>
						<Table variant="striped" colorScheme="pink">
							<TableCaption>List of available rooms per city.</TableCaption>
							<Thead>
								<Tr>
									<Th>City</Th>
									<Th isNumeric>Available Rooms</Th>
								</Tr>
							</Thead>
							<Tbody>
								{availableRooms.map((entry, i) => (
									<Tr key={i}>
										<Td>{entry.City}</Td>
										<Td isNumeric>{entry.AvailableRooms}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
					<h2 className="text-2xl font-bold text-gray-900">
						Aggregated Capacity Per Hotel View
					</h2>
					<TableContainer>
						<Table variant="striped" colorScheme="pink">
							<TableCaption>
								List of total guest capacity per hotel.
							</TableCaption>
							<Thead>
								<Tr>
									<Th>Hotel Name</Th>
									<Th isNumeric>Total Capacity</Th>
								</Tr>
							</Thead>
							<Tbody>
								{hotelCapacities.map((hotel, i) => (
									<Tr key={i}>
										<Td>{hotel.HotelName}</Td>
										<Td isNumeric>{hotel.TotalCapacity}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</div>
	);
}
