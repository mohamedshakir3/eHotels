import { PaperClipIcon } from "@heroicons/react/20/solid";
import { type User } from "@/types";

import Profile from "@/components/Profile";

import { getSession } from "@/lib";
export default async function page() {
	const session = await getSession();
	const user: User = session?.user;
	console.log(user);
	return (
		<div className="md:container min-w-80 md:mx-auto">
			<Profile User={user} />
		</div>
	);
}
