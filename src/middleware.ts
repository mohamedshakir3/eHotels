import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib";
import { decrypt, encrpyt } from "@/lib";

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	const session = cookies().get("session")?.value;
	if (!session) return;

	if (request.nextUrl.pathname === "/Bookings" && !session) {
		return NextResponse.redirect(new URL("/Login", request.nextUrl));
	}

	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + 10 * 1000);
	const res = NextResponse.next();

	res.cookies.set({
		name: "session",
		value: await encrpyt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
}
