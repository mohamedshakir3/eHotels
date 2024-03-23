"use client";
import { addRoom } from "@/lib";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { redirect } from "next/navigation";

export default function SignupForm({ HotelID }) {
	const [hotelID, chainID] = HotelID;
	async function clientAction(formData: FormData) {
		console.log(`/Chains/${chainID}`);
		const { amenities, view, extendable, price, capacity, imagehref }: any =
			Object.fromEntries(formData);

		switch (true) {
			case amenities === "":
				toast.error("Amenities are required!");
				setError("amenities");
				return;
			case view === "":
				toast.error("View is required!");
				setError("view");
				return;
			case extendable === "":
				toast.error("Extendable is required!");
				setError("extendable");
				return;
			case price === "":
				toast.error("Price is required!");
				setError("price");
				return;
			case capacity === "":
				toast.error("Capacity is required!");
				setError("capacity");
				return;
			case imagehref === "":
				toast.error("Image URL is required!");
				setError("imagehref");
				return;
		}
		const res: any = await addRoom({
			amenities,
			view,
			extendable,
			price,
			capacity,
			imagehref,
			hotelID,
			chainID,
		});

		console.log(res);

		if (res?.error) {
			toast.error(res.error);
		} else {
			toast.success("Room added successfully! Redirecting...");

			redirect(`/Chains/${chainID}`);
		}
	}

	const [error, setError] = useState("");

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full lg:max-w-2xl">
				<form action={clientAction}>
					<div className="space-y-12">
						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">
								Room Information
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								Use a working image URL that can be accessed and rendered.
								Amentities should be separated by commas.
							</p>

							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-3">
									<label
										htmlFor="amenities"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Amenities
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="amenities"
											id="amenities"
											className={`block w-full rounded-md ${
												error === "amenities"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "amenities" && (
											<p className="text-rose-500 text-sm">
												Amenities are required.
											</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="view"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										View
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="view"
											id="view"
											className={`block w-full rounded-md ${
												error === "view"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "view" && (
											<p className="text-rose-500 text-sm">View is required.</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="extendable"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Extendable
									</label>
									<div className="mt-2">
										<select
											id="extendable"
											name="extendable"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
										>
											<option>No</option>
											<option>Yes</option>
										</select>
									</div>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="price"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Price
									</label>
									<div className="relative mt-2 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<span className="text-gray-500 sm:text-sm">$</span>
										</div>
										<input
											type="number"
											name="price"
											id="price"
											className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											placeholder="0.00"
										/>
										<div className="absolute inset-y-0 right-0 flex items-center">
											<label htmlFor="currency" className="sr-only">
												Currency
											</label>
											<select
												id="currency"
												name="currency"
												className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
											>
												<option>USD</option>
												<option>CAD</option>
											</select>
										</div>
									</div>
									{error === "price" && (
										<p className="text-rose-500 text-sm">Price is required.</p>
									)}
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="capacity"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Capacity
									</label>
									<div className="mt-2">
										<input
											type="number"
											name="capacity"
											id="capacity"
											className={`block w-full rounded-md ${
												error === "capacity"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "capacity" && (
											<p className="text-rose-500 text-sm">
												Capacity is required.
											</p>
										)}
									</div>
								</div>
								<div className="col-span-full">
									<label
										htmlFor="imagehref"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Image URL
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="imagehref"
											id="imagehref"
											className={`block w-full rounded-md ${
												error === "imagehref"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "imagehref" && (
											<p className="text-rose-500 text-sm">
												An image URL is required.
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-end gap-x-6">
						<button
							type="button"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
