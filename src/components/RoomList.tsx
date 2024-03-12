/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
"use client";

import { type Room } from "@/types";
import { useEffect } from "react";

export default function RoomList({
	columns,
	rooms,
}: {
	columns: number;
	rooms: Room[];
}) {
	const roomElems = rooms.map((room) => (
		<div key={room.RoomID} className="group relative">
			<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
				<img
					src={room.image_href}
					alt={room.HotelName}
					className="h-full w-full object-cover object-center lg:h-full lg:w-full"
				/>
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-gray-700">
						<a href={`Rooms/${room.RoomID}`}>
							<span aria-hidden="true" className="absolute inset-0" />
							{room.HotelName}
						</a>
					</h3>
					<p className="mt-1 text-sm text-gray-500">{room.Amenities}</p>
				</div>
				<p className="text-sm font-medium text-gray-900">{`\$${room.Price}`}</p>
			</div>
		</div>
	));

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				{columns === 1 ? (
					<div
						className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8`}
					>
						{roomElems}
					</div>
				) : (
					<div
						className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8`}
					>
						{roomElems}
					</div>
				)}
			</div>
		</div>
	);
}
