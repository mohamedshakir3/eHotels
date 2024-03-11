import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { updateSession } from "./lib";

export async function middleware(request: NextRequest) {
	try {
		await updateSession();
	} catch (error) {
		console.log(error);
	}
	const response = NextResponse.next();

	const session = cookies().get("session")?.value;

	if (request.nextUrl.pathname === "/Bookings" && !session) {
		return NextResponse.redirect(new URL("/Login", request.nextUrl));
	}
}
