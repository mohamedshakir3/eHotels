import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const session = request.cookies.get("session")?.value;

	if (request.nextUrl.pathname === "/Bookings" && !session) {
		return NextResponse.redirect(new URL("/Login", request.url));
	}

	if (request.nextUrl.pathname === "/Login" && session) {
		return NextResponse.redirect(new URL("/Bookings", request.url));
	}

	if (!session) return;
}
