import RoomForm from "@/components/RoomForm";

export default function page({ params }: { params: { HotelID: string } }) {
	return <RoomForm HotelID={params.HotelID} />;
}
