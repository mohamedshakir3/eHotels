import { getBookings, getSession, getRentings } from "@/lib";
import Bookings from "@/components/Bookings";

export default async function page() {
	const bookings: any = await getBookings();
	const rentings: any = await getRentings();
	const session = await getSession();
	const user = session.user;

	return <Bookings bookings={bookings} rentings={rentings} user={user} />;
}
