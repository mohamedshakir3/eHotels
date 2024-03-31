"use client";
import {
	type Booking,
	type Employee,
	type Customer,
	type Renting,
	type User,
} from "@/types";
import Link from "next/link";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { createRenting } from "@/lib";
import EmployeeDialog from "@/components/EmployeeDialog";
import CustomerDialog from "@/components/CustomerDialog";
import {
	BriefcaseIcon,
	CalendarIcon,
	CheckIcon,
	ChevronDownIcon,
	CurrencyDollarIcon,
	LinkIcon,
	MapPinIcon,
	PencilIcon,
	AtSymbolIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
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

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Bookings({
	bookings,
	rentings,
	user,
}: {
	bookings: Booking[];
	rentings: Renting[];
	user: any;
}) {
	const validateRenting = () => {
		if (selected === 0) {
			toast.error("Please select a booking to rent.");
			return;
		} else {
			setOpen(true);
		}
	};

	const makeRenting = async () => {
		const response = await createRenting(selected);
		if (response?.error) {
			toast.error(response.error);
		} else {
			toast.success("Renting created successfully");
		}
	};
	const [selected, setSelected] = useState(0);
	const [open, setOpen] = useState(false);

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			{user?.Role !== "Customer" ? (
				<EmployeeDialog open={open} setOpen={setOpen} onClick={makeRenting} />
			) : (
				<CustomerDialog open={open} setOpen={setOpen} />
			)}

			<form action={validateRenting}>
				<div className="lg:flex lg:items-center lg:justify-between">
					<div className="min-w-0 flex-1">
						<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
							{user.Name}
						</h2>
						<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
							<div className="mt-2 flex items-center text-sm text-gray-500">
								<MapPinIcon
									className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
								{user.Address}
							</div>
							<div className="mt-2 flex items-center text-sm text-gray-500">
								<AtSymbolIcon
									className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
								{user.Email}
							</div>
							<div className="mt-2 flex items-center text-sm text-gray-500">
								<CalendarIcon
									className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
								{user?.Role !== "Customer"
									? "Hired on " + formatDate(new Date(user.RegistrationDate))
									: "Registered on " +
									  formatDate(new Date(user.RegistrationDate))}
							</div>
						</div>
					</div>
					<div className="mt-5 flex lg:ml-4 lg:mt-0">
						<span className="hidden sm:block">
							<Link
								href="/Profile"
								className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							>
								<PencilIcon
									className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								Edit
							</Link>
						</span>

						<span className="ml-3 hidden sm:block">
							<button
								type="button"
								className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							>
								<LinkIcon
									className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								Create
							</button>
						</span>

						<span className="sm:ml-3">
							<button
								type={user?.Role === "Employee" ? "submit" : "button"}
								onClick={
									user?.Role === "Customer" ? () => setOpen(true) : () => {}
								}
								className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<CheckIcon
									className="-ml-0.5 mr-1.5 h-5 w-5"
									aria-hidden="true"
								/>
								Rent
							</button>
						</span>

						{/* Dropdown */}
						<Menu as="div" className="relative ml-3 sm:hidden">
							<Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
								More
								<ChevronDownIcon
									className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</Menu.Button>

							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<Menu.Item>
										{({ active }) => (
											<a
												href="#"
												className={classNames(
													active ? "bg-gray-100" : "",
													"block px-4 py-2 text-sm text-gray-700"
												)}
											>
												Edit
											</a>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<a
												href="#"
												className={classNames(
													active ? "bg-gray-100" : "",
													"block px-4 py-2 text-sm text-gray-700"
												)}
											>
												Create
											</a>
										)}
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
				<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12 mb-3">
					<h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
					<ul role="list" className="divide-y divide-gray-100">
						{bookings.map((booking: Booking) => (
							<li
								key={booking.BookingID}
								className="flex justify-between gap-x-6 py-5"
								id={`${booking.BookingID}`}
							>
								<div className="flex min-w-0 gap-x-4">
									{user?.Role === "Customer" ? null : (
										<input
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
											type="radio"
											id={`${booking.BookingID}`}
											name="Booking"
											onChange={() => setSelected(booking.BookingID)}
										/>
									)}
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
			</form>
			<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12 mb-3">
				<h2 className="text-2xl font-bold text-gray-900">Renting Archive</h2>
				<ul role="list" className="divide-y divide-gray-100">
					{rentings.map((renting: Renting) => (
						<li
							key={renting.RentingID}
							className="flex justify-between gap-x-6 py-5"
							id={`${renting.RentingID}`}
						>
							<div className="flex min-w-0 gap-x-4">
								<Link href={`Rooms/${renting.RoomID}`}>
									<img
										className="h-36 w-48 flex-none rounded-md bg-gray-50"
										src={renting.image_href}
										alt=""
									/>
								</Link>
								<div className="min-w-0 flex-auto">
									<p className="text-sm font-semibold leading-6 text-gray-900">
										{renting.HotelName}
									</p>
									<p className="mt-1 truncate text-xs leading-5 text-gray-500">
										{`${renting.Street}, ${renting.City}, ${renting.PostalCode}, ${renting.Country}`}
									</p>
									<p className="mt-1 text-xs leading-5 text-gray-500">
										{`Capacity: ${renting.Capacity} View: ${renting.View} Category: ${renting.Category} Stars`}
									</p>
									<p className="mt-1 text-xs leading-5 text-gray-500">
										{`Amenities: ${renting.Amenities}`}
									</p>
									<p className="mt-1 text-xs leading-5 text-gray-500">
										{renting.Extendable ? "Extendable" : "Not Extendable"}
									</p>
								</div>
							</div>
							<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
								<p className="text-sm leading-6 text-gray-900">{`Start Date: ${formatDate(
									renting.StartDate
								)}`}</p>
								<p className="text-sm leading-6 text-gray-900">{`End Date: ${formatDate(
									renting.EndDate
								)}`}</p>

								<div className="mt-1 flex items-center gap-x-1.5">
									<div className="flex-none rounded-full bg-emerald-500/20 p-1">
										<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
									</div>
									<p className="text-xs leading-5 text-gray-500">
										Price: ${renting.Price}
									</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
