"use client";
import { type Customer } from "@/types";
import {
	Editable,
	EditableInput,
	EditableTextarea,
	EditablePreview,
} from "@chakra-ui/react";
import { updateUser } from "@/lib";
import { toast } from "react-hot-toast";
import { useState } from "react";

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

export default function Profile({ User }: { User: any }) {
	const [user, setUser] = useState(User);

	async function submitChange(e) {
		e.preventDefault();
		const res = await updateUser(user);
		if (res?.error) {
			toast.error(res.error);
		} else {
			toast.success("Profile Updated!");
		}
	}

	return (
		<div>
			<div className="px-4 sm:px-0">
				<h3 className="text-base font-semibold leading-7 text-gray-900">
					Customer Information
				</h3>
				<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
					Personal details and information.
				</p>
			</div>
			<form onSubmit={submitChange}>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-100">
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Full name
							</dt>
							<Editable
								className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
								defaultValue={User.Name}
								onChange={(value) => setUser({ ...user, Name: value })}
							>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Address
							</dt>
							<Editable
								className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
								defaultValue={User.Address}
								onChange={(value) => setUser({ ...user, Address: value })}
							>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Email address
							</dt>
							<Editable
								className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
								defaultValue={User.Email}
								onChange={(value) => setUser({ ...user, Email: value })}
							>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Password
							</dt>
							<Editable
								className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
								defaultValue={User.Password}
								onChange={(value) => setUser({ ...user, Password: value })}
							>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Social Security Number
							</dt>
							<Editable
								className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
								defaultValue={User.SSN}
								onChange={(value) => setUser({ ...user, SSN: value })}
							>
								<EditablePreview />
								<EditableInput />
							</Editable>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Date of Registration
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{formatDate(new Date(User.RegistrationDate))}
							</dd>
						</div>
					</dl>
				</div>
				<button
					type="submit"
					className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Save
				</button>
			</form>
		</div>
	);
}
