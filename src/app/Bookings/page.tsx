import { getBookings } from "@/lib";
import { type Booking } from "@/types";
import Link from "next/link";

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

export default async function Bookings() {
	const bookings: any = await getBookings();
	return (
		<div className="mx-auto max-w-4xl">
			<ul role="list" className="divide-y divide-gray-100">
				{bookings.map((booking: Booking) => (
					<li
						key={`${booking.Street}, ${booking.City}, ${booking.PostalCode}, ${booking.Country}`}
						className="flex justify-between gap-x-6 py-5"
					>
						<div className="flex min-w-0 gap-x-4">
							<Link href={`Rooms/${booking.RoomID}`}>
								<img
									className="h-36 w-48 flex-none rounded-md bg-gray-50"
									src={booking.image_href}
									alt=""
								/>
							</Link>
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{booking.HotelName}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									{`${booking.Street}, ${booking.City}, ${booking.PostalCode}, ${booking.Country}`}
								</p>
								<p className="mt-1 text-xs leading-5 text-gray-500">
									{`Capacity: ${booking.Capacity} View: ${booking.View} Category: ${booking.Category} Stars`}
								</p>
								<p className="mt-1 text-xs leading-5 text-gray-500">
									{`Amenities: ${booking.Amenities}`}
								</p>
								<p className="mt-1 text-xs leading-5 text-gray-500">
									{booking.Extendable ? "Extendable" : "Not Extendable"}
								</p>
							</div>
						</div>
						<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
							<p className="text-sm leading-6 text-gray-900">{`Start Date: ${formatDate(
								booking.StartDate
							)}`}</p>
							<p className="text-sm leading-6 text-gray-900">{`End Date: ${formatDate(
								booking.EndDate
							)}`}</p>

							<div className="mt-1 flex items-center gap-x-1.5">
								<div className="flex-none rounded-full bg-emerald-500/20 p-1">
									<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
								</div>
								<p className="text-xs leading-5 text-gray-500">
									Price: ${booking.Price}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
