import { NextResponse, type NextRequest } from "next/server";
import { decrypt, encrypt } from "./lib";

export async function middleware(request: NextRequest) {
	const session = request.cookies.get("session")?.value;

	if (request.nextUrl.pathname === "/Bookings]" && !session) {
		console.log("Redirecting to Login");
		return NextResponse.redirect(new URL("/Login", request.url));
	}

	if (!session) return;

	const parsed = await decrypt(session);

	const res = NextResponse.next();

	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});

	return res;
}
