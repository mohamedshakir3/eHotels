import { NextResponse, type NextRequest } from "next/server";

import { SignJWT, jwtVerify } from "jose";
// import { decrypt, getSession } from "@/lib";
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
	const session = request.cookies.get("session")?.value;

	let user;

	if (session) {
		const { payload } = await jwtVerify(session, key, {
			algorithms: ["HS256"],
		});
		user = payload?.user;
	}

	if (
		request.nextUrl.pathname.includes("/Chains/Edit") ||
		request.nextUrl.pathname.includes("/AddRoom")
	) {
		if (!user || user?.Role !== "Manager") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (request.nextUrl.pathname === "/Bookings" && !session) {
		return NextResponse.redirect(new URL("/Login", request.url));
	}

	if (request.nextUrl.pathname === "/Login" && session) {
		return NextResponse.redirect(new URL("/Bookings", request.url));
	}

	if (request.nextUrl.pathname === "/Profile" && !session) {
		return NextResponse.redirect(new URL("/Login", request.url));
	}

	if (request.nextUrl.pathname === "/Signup" && session) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!session) return;
}
