import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { Query } from "@/lib";
import { type User } from "@/types";
import { z } from "zod";

async function getUser(email: string): Promise<User | undefined> {
	try {
		const user = await Query("SELECT * FROM Customer WHERE email = ?", [email]);
		return user[0];
	} catch (error) {
		throw new Error("Failed to find user.");
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user: any = await getUser(email);
					if (!user) return null;

					if (user.Password === password) return user;
				}
				console.log("Invalid credentials");
				return null;
			},
		}),
	],
});
