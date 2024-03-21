import { getBookings, getSession, getRentings } from "@/lib";
import { type Booking, type Employee } from "@/types";
import Link from "next/link";
import Bookings from "@/components/Bookings";

function formatDate(date: Date) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return `${months[date.getMonth()]}, ${date.getDate()}, ${date.getFullYear()}`;
}

export default async function page() {
	const bookings: any = await getBookings();
	const rentings: any = await getRentings();
	const session = await getSession();
	const user = session.user;

	console.log(rentings);

	if (user?.HiringDate) {
		const employee: Employee = user;
	}

	return <Bookings bookings={bookings} rentings={rentings} user={user} />;
}
