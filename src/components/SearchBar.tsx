"use client";
import DatePicker from "./DatePicker";
import CountrySelector from "./CountrySelector";
import { useState } from "react";
import Link from "next/link";

export default function SearchBar() {
	const [value, setValue] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	const [selected, setSelected] = useState({
		name: "United States",
		flag: "https://flagcdn.com/us.svg",
		emoji: "🇺🇸",
	});

	return (
		<>
			<CountrySelector selected={selected} setSelected={setSelected} />
			<DatePicker value={value} setValue={setValue} />
			<Link
				href={{
					pathname: "/SearchResults",
					query: {
						startDate: value.startDate.toString(),
						endDate: value.endDate.toString(),
						country: selected.name,
					},
				}}
				className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Search
			</Link>
		</>
	);
}
