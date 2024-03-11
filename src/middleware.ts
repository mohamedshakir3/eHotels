import { NextResponse, type NextRequest } from "next/server";
// import { getSession } from "@/lib";
import { cookies } from "next/headers";
import { updateSession } from "./lib";

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	const session = cookies().get("session")?.value;

	if (request.nextUrl.pathname === "/Bookings" && !session) {
		return NextResponse.redirect(new URL("/Login", request.nextUrl));
	}

	return await updateSession(request);
}
