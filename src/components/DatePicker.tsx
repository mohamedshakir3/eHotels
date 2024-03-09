"use client";

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type DatePickerProps = {
	value: { startDate: Date; endDate: Date };
	setValue: ({
		startDate,
		endDate,
	}: {
		startDate: Date;
		endDate: Date;
	}) => void;
};

export default function DatePicker({ value, setValue }: DatePickerProps) {
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
