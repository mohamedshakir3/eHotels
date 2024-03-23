import { NextResponse, type NextRequest } from "next/server";

import { getSession } from "@/lib";

export async function middleware(request: NextRequest) {
	const session = await getSession();
	const user = session?.user;

	if (request.nextUrl.pathname.includes("/Chains/Edit")) {
		if (!user || user?.HiringDate === undefined) {
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
