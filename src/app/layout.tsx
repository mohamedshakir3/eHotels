import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import { getSession } from "@/lib";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "E-Hotels",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = await getSession();

	return (
		<html className="h-full bg-white" lang="en">
			<body>
				<div>
					<Header user={auth} />
					{children}
					<Toaster position="top-right" />
				</div>
			</body>
		</html>
	);
}
