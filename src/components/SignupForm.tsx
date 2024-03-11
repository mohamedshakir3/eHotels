"use client";
import { addUser } from "@/lib";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { redirect } from "next/navigation";

export default function SignupForm() {
	async function clientAction(formData: FormData) {
		const {
			firstname,
			lastname,
			email,
			password,
			confirmpassword,
			city,
			region,
			postalcode,
			ssn,
			streetaddress,
		} = Object.fromEntries(formData);
		switch (true) {
			case password === "":
				toast.error("Password is required!");
				setError("password");
				return;
			case ssn === "":
				toast.error("SSN/SIN is required!");
				setError("ssn");
				return;
			case confirmpassword === "":
				toast.error("Must confirm password!");
				setError("confirmpassword");
				return;
			case firstname === "":
				toast.error("First name is required!");
				setError("firstname");
				return;
			case lastname === "":
				toast.error("Last name is required!");
				setError("lastname");
				return;
			case email === "":
				toast.error("Email is required!");
				setError("email");
				return;
			case city === "":
				toast.error("City is required!");
				setError("city");
				return;
			case streetaddress === "":
				toast.error("Street address is required!");
				setError("streetaddress");
				return;
			case region === "":
				toast.error("State is required!");
				setError("region");
				return;
			case postalcode === "":
				toast.error("Postal code is required!");
				setError("postalcode");
				return;
			case password !== confirmpassword:
				toast.error("Passwords do not match");
				return;
		}

		try {
			await addUser(formData);

			toast.success("Account created successfully!");
		} catch (error) {
			console.log(error);
			return;
		}
		redirect("/Bookings");

		// if (result?.error) {
		// 	toast.error("An error occurred. Please try again.");
		// } else {
		// 	toast.success("Account created successfully!");
		// }
	}

	const [error, setError] = useState("");

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full lg:max-w-2xl">
				<form action={clientAction}>
					<div className="space-y-12">
						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">
								Personal Information
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								Use a permanent address where you can receive mail.
							</p>

							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-3">
									<label
										htmlFor="firstname"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										First name
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="firstname"
											id="firstname"
											autoComplete="given-name"
											className={`block w-full rounded-md ${
												error === "firstname"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "firstname" && (
											<p className="text-rose-500 text-sm">
												First name is required.
											</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="lastname"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Last name
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="lastname"
											id="lastname"
											autoComplete="family-name"
											className={`block w-full rounded-md ${
												error === "lastname"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "lastname" && (
											<p className="text-rose-500 text-sm">
												Last name is required.
											</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-4">
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Email address
									</label>
									<div className="mt-2">
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											className={`block w-full rounded-md ${
												error === "email"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "email" && (
											<p className="text-rose-500 text-sm">
												Email is required.
											</p>
										)}
									</div>
								</div>
								<div className="sm:col-span-2">
									<label
										htmlFor="ssn"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										SSN/SIN
									</label>
									<div className="mt-2">
										<input
											id="ssn"
											name="ssn"
											className={`block w-full rounded-md ${
												error === "ssn"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "ssn" && (
											<p className="text-rose-500 text-sm">
												SSN/SIN is required.
											</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Password
									</label>
									<div className="mt-2">
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="password"
											className={`block w-full rounded-md ${
												error === "password"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "password" && (
											<p className="text-rose-500 text-sm">
												Password is required.
											</p>
										)}
									</div>
								</div>
								<div className="sm:col-span-3">
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Confirm Password
									</label>
									<div className="mt-2">
										<input
											id="confirmpassword"
											name="confirmpassword"
											type="password"
											className={`block w-full rounded-md ${
												error === "confirmpassword"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "confirmpassword" && (
											<p className="text-rose-500 text-sm">
												Must confirm password.
											</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="country"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Country
									</label>
									<div className="mt-2">
										<select
											id="country"
											name="country"
											autoComplete="country-name"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
										>
											<option>United States</option>
											<option>Canada</option>
											<option>Mexico</option>
										</select>
									</div>
								</div>

								<div className="col-span-full">
									<label
										htmlFor="streetaddress"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Street address
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="streetaddress"
											id="streetaddress"
											autoComplete="streetaddress"
											className={`block w-full rounded-md ${
												error === "streetaddress"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "streetaddress" && (
											<p className="text-rose-500 text-sm">
												Street address is required.
											</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-2 sm:col-start-1">
									<label
										htmlFor="city"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										City
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="city"
											id="city"
											autoComplete="address-level2"
											className={`block w-full rounded-md ${
												error === "city"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "city" && (
											<p className="text-rose-500 text-sm">City is required.</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="region"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										State / Province
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="region"
											id="region"
											autoComplete="address-level1"
											className={`block w-full rounded-md ${
												error === "region"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "region" && (
											<p className="text-rose-500 text-sm">
												State / Provice is required.
											</p>
										)}
									</div>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="postalcode"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										ZIP / Postal code
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="postalcode"
											id="postalcode"
											autoComplete="postalcode"
											className={`block w-full rounded-md ${
												error === "postalcode"
													? "border-2 border-rose-500"
													: "border-0"
											} py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										/>
										{error === "postalcode" && (
											<p className="text-rose-500 text-sm">
												ZIP / Postal code is required.
											</p>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">
								Notifications
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								We&apos;ll always let you know about important changes, but you
								pick what else you want to hear about.
							</p>

							<div className="mt-10 space-y-10">
								<fieldset>
									<legend className="text-sm font-semibold leading-6 text-gray-900">
										By Email
									</legend>
									<div className="mt-6 space-y-6">
										<div className="relative flex gap-x-3">
											<div className="flex h-6 items-center">
												<input
													id="comments"
													name="comments"
													type="checkbox"
													className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
												/>
											</div>
											<div className="text-sm leading-6">
												<label
													htmlFor="comments"
													className="font-medium text-gray-900"
												>
													Comments
												</label>
												<p className="text-gray-500">
													Get notified when someones posts a comment on a
													posting.
												</p>
											</div>
										</div>
										<div className="relative flex gap-x-3">
											<div className="flex h-6 items-center">
												<input
													id="candidates"
													name="candidates"
													type="checkbox"
													className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
												/>
											</div>
											<div className="text-sm leading-6">
												<label
													htmlFor="candidates"
													className="font-medium text-gray-900"
												>
													Candidates
												</label>
												<p className="text-gray-500">
													Get notified when a candidate applies for a job.
												</p>
											</div>
										</div>
										<div className="relative flex gap-x-3">
											<div className="flex h-6 items-center">
												<input
													id="offers"
													name="offers"
													type="checkbox"
													className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
												/>
											</div>
											<div className="text-sm leading-6">
												<label
													htmlFor="offers"
													className="font-medium text-gray-900"
												>
													Offers
												</label>
												<p className="text-gray-500">
													Get notified when a candidate accepts or rejects an
													offer.
												</p>
											</div>
										</div>
									</div>
								</fieldset>
								<fieldset>
									<legend className="text-sm font-semibold leading-6 text-gray-900">
										Push Notifications
									</legend>
									<p className="mt-1 text-sm leading-6 text-gray-600">
										These are delivered via SMS to your mobile phone.
									</p>
									<div className="mt-6 space-y-6">
										<div className="flex items-center gap-x-3">
											<input
												id="push-everything"
												name="push-notifications"
												type="radio"
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
											<label
												htmlFor="push-everything"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Everything
											</label>
										</div>
										<div className="flex items-center gap-x-3">
											<input
												id="push-email"
												name="push-notifications"
												type="radio"
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
											<label
												htmlFor="push-email"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Same as email
											</label>
										</div>
										<div className="flex items-center gap-x-3">
											<input
												id="push-nothing"
												name="push-notifications"
												type="radio"
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>
											<label
												htmlFor="push-nothing"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												No push notifications
											</label>
										</div>
									</div>
								</fieldset>
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
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
