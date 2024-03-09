"use client";

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function DatePicker() {
	const [value, setValue] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	const handleValueChange = (newValue: any) => {
		console.log("newValue:", newValue);
		setValue(newValue);
	};

	return (
		<Datepicker
			primaryColor={"fuchsia"}
			value={value}
			onChange={handleValueChange}
			showShortcuts={true}
		/>
	);
}
