"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { logout } from "@/lib";
import { toast } from "react-hot-toast";
import HeaderOptions from "@/components/HeaderOptions";
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon,
	HomeModernIcon,
	UserIcon,
} from "@heroicons/react/24/outline";

import {
	ChevronDownIcon,
	PhoneIcon,
	PlayCircleIcon,
	HomeIcon,
} from "@heroicons/react/20/solid";

const chains = [
	{
		name: "Wyndham",
		description:
			"Global leader, 9300 hotels, diverse accommodations across 75 countries",
		href: "/Chains/1",
		icon: HomeIcon,
	},
	{
		name: "Marriot",
		description:
			"7500 hotels, luxury to midscale options, spanning 131 countries",
		href: "/Chains/2",
		icon: HomeModernIcon,
	},
	{
		name: "Choice Hotels",
		description: "Established 1939, 7100 hotels, upscale to economy choices",
		href: "/Chains/3",
		icon: SquaresPlusIcon,
	},
	{
		name: "Hilton",
		description: "Prestigious, 6200 hotels, luxury to midscale, 118 countries",
		href: "/Chains/4",
		icon: ChartPieIcon,
	},
	{
		name: "InterContinental",
		description:
			"Established 1946, 5700 hotels, luxury to midscale, 100 countries",
		href: "/Chains/5",
		icon: CursorArrowRaysIcon,
	},
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Header({ user }: { user: any }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const clientLogout = async () => {
		const res = await logout();
		if (res?.error) {
			toast.error("Something went wrong!");
			return;
		}
		toast.success("Logged out successfully!");
	};

	return (
		<header className="bg-white">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Link href="/" className="-m-1.5 p-1.5">
						<span className="sr-only">E-Hotels</span>
						<img
							className="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt=""
						/>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<Popover.Group className="hidden lg:flex lg:gap-x-12">
					<Popover className="relative">
						<Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
							Chains
							<ChevronDownIcon
								className="h-5 w-5 flex-none text-gray-400"
								aria-hidden="true"
							/>
						</Popover.Button>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
								<div className="p-4">
									{chains.map((item) => (
										<div
											key={item.name}
											className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
										>
											<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
												<item.icon
													className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
													aria-hidden="true"
												/>
											</div>
											<div className="flex-auto">
												<a
													href={item.href}
													className="block font-semibold text-gray-900"
												>
													{item.name}
													<span className="absolute inset-0" />
												</a>
												<p className="mt-1 text-gray-600">{item.description}</p>
											</div>
										</div>
									))}
								</div>
							</Popover.Panel>
						</Transition>
					</Popover>

					<Link
						href="/Views"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Views
					</Link>
					<Link
						href="/Bookings"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Bookings
					</Link>
					<a href="#" className="text-sm font-semibold leading-6 text-gray-900">
						About
					</a>
				</Popover.Group>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					{!user ? (
						<Link
							href="/Login"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Log in <span aria-hidden="true">&rarr;</span>
						</Link>
					) : (
						// <Link
						// 	href="/"
						// 	className="text-sm font-semibold leading-6 text-gray-900"
						// 	onClick={() => clientLogout()}
						// >
						// 	Logout <span aria-hidden="true">&rarr;</span>
						// </Link>
						<HeaderOptions clientLogout={clientLogout} />
					)}
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">E-Hotels</span>
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<Disclosure as="div" className="-mx-3">
									{({ open }) => (
										<>
											<Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
												Chains
												<ChevronDownIcon
													className={classNames(
														open ? "rotate-180" : "",
														"h-5 w-5 flex-none"
													)}
													aria-hidden="true"
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="mt-2 space-y-2">
												{[...chains].map((item) => (
													<Disclosure.Button
														key={item.name}
														as="a"
														href={item.href}
														className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
													>
														{item.name}
													</Disclosure.Button>
												))}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
								<Link
									href="/Views"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Views
								</Link>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Bookings
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									About
								</a>
							</div>
							<div className="space-y-2 py-6">
								{!user ? (
									<Link
										href="/Login"
										className="text-sm font-semibold leading-6 text-gray-900"
									>
										Log in <span aria-hidden="true">&rarr;</span>
									</Link>
								) : (
									<>
										<Link
											href="/Profile"
											className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
										>
											Profile <span aria-hidden="true">&rarr;</span>
										</Link>

										<Link
											href="/"
											className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold  leading-6 text-gray-900 hover:bg-gray-50"
											onClick={() => clientLogout()}
										>
											Logout <span aria-hidden="true">&rarr;</span>
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
