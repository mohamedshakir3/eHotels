import next from "next";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/Login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnBookings = nextUrl.pathname.startsWith("/Bookings");
			if (isOnBookings) {
				if (isLoggedIn) return true;
				return false;
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/Bookings", nextUrl));
			}
			return true;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
