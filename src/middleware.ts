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

	const expires = new Date(Date.now() + 10 * 1000);
	const updatedSession = await encrypt({ parsed, expires });

	res.cookies.set("session", updatedSession, { expires, httpOnly: true });

	return res;
}
