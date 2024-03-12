import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
	const session = cookies().get("session")?.value;
	if (!session) return;
	if (request.nextUrl.pathname === "/Bookings" && !session) {
		return NextResponse.redirect(new URL("/Login", request.nextUrl));
	}
}
