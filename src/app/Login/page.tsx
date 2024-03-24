import LoginForm from "@/components/LoginForm";
import { login } from "@/lib";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Home() {
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<LoginForm />

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<Link
							href="/Signup"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Sign up!
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
