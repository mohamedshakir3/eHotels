"use client";
import { login } from "@/lib";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginForm() {
	const [userError, setUserError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	return (
		<form
			className="space-y-6"
			action={async (formData) => {
				const res: any = await login(formData);
				console.log(res);
				if (res?.error) {
					if (res.error === "User") {
						setUserError(true);
						toast.error("User not found!");
					}
					if (res.error === "Password") {
						setPasswordError(true);
						toast.error("Invalid password");
					}
				} else {
					toast.success("Logged in!");
					redirect("/");
				}
			}}
		>
			<div>
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
						required
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
					{userError && (
						<p className="text-rose-500 text-sm">User not found!</p>
					)}
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between">
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Password
					</label>
					<div className="text-sm">
						<a
							href="#"
							className="font-semibold text-indigo-600 hover:text-indigo-500"
						>
							Forgot password?
						</a>
					</div>
				</div>
				<div className="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
					{passwordError && (
						<p className="text-rose-500 text-sm">Incorrect Password!</p>
					)}
				</div>
			</div>

			<div>
				<button
					type="submit"
					className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Sign in
				</button>
			</div>
		</form>
	);
}
