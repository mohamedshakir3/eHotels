import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const session = request.cookies.get("session")?.value;

	if (request.nextUrl.pathname === "/Bookings" && !session) {
		console.log("Redirecting to Login");
		return NextResponse.redirect(new URL("/Login", request.url));
	}

	if (!session) return;
}
