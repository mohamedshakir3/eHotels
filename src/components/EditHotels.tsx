"use client";
import WarningDialog from "@/components/WarningDialog";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import {
	Editable,
	EditableInput,
	EditableTextarea,
	EditablePreview,
} from "@chakra-ui/react";
import {
	BriefcaseIcon,
	MapPinIcon,
	AtSymbolIcon,
	PhoneIcon,
	CheckIcon,
	StarIcon,
	XMarkIcon,
	PlusIcon,
} from "@heroicons/react/20/solid";

import { toast } from "react-hot-toast";

import { updateHotels } from "@/lib";

export default function EditHotels({ hotelInfo }: { hotelInfo: Object }) {
	const chainID = hotelInfo[Object.keys(hotelInfo)[0]].ChainID;
	const [hotelInfoState, setHotelInfoState] = useState(hotelInfo);

	const [updates, setUpdates] = useState<Object>({});

	const [open, setOpen] = useState(false);
	const [openRoomDialog, setOpenRoomDialog] = useState(false);
	async function updateHotelInfo() {
		const res = await updateHotels(hotelInfoState, updates);
		if (res?.error) {
			toast.error(res.error);
		} else {
			toast.success("Hotel information updated successfully!");
		}
	}

	const [roomIDState, setRoomIDState] = useState(-1);
	const deleteRoom = (roomID) => {
		setRoomIDState(roomID);
		setOpen(true);
	};

	const addUpdates = (change, HotelID, roomID = -1) => {
		if (!updates.hasOwnProperty(HotelID)) {
			setUpdates({ ...updates, [HotelID]: roomID === -1 ? [] : [roomID] });
		} else if (roomID !== -1) {
			setUpdates({ ...updates, [HotelID]: [...updates[HotelID], roomID] });
		}

		setHotelInfoState(change);
	};

	return (
		<div>
			<WarningDialog
				open={open}
				setOpen={setOpen}
				roomID={roomIDState}
				chainID={chainID}
			/>
			<form action={updateHotelInfo}>
				<div className="flex items-center justify-between border-b border-gray-200 py-6">
					<h1 className="text-2xl font-semibold leading-tight text-gray-900">
						Hotel Chains Information
					</h1>
					<button
						type="submit"
						className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						<CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
						Save Changes
					</button>
				</div>
				{Object.entries(hotelInfo).map(([hotelName, hotelInfo]: any, index) => (
					<div key={hotelInfo.HotelID}>
						<div className="min-w-0 flex-1">
							<h2
								key={hotelName}
								className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
							>
								{hotelName}
							</h2>

							<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<BriefcaseIcon
										className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									Manager:&nbsp;{hotelInfo.Manager}
								</div>
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<MapPinIcon
										className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<Editable
										className="mt-1 text-sm leading-6 text-gray-500 sm:mt-0"
										defaultValue={hotelInfo.Street}
										onSubmit={(value) =>
											addUpdates(
												{
													...hotelInfoState,
													[hotelName]: { ...hotelInfo, Street: value },
												},
												hotelInfo.HotelID
											)
										}
									>
										<EditablePreview />
										<EditableInput />
									</Editable>
								</div>
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<AtSymbolIcon
										className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<Editable
										className="mt-1 text-sm leading-6 text-gray-500 sm:mt-0"
										defaultValue={hotelInfo.Email}
										onSubmit={(value) =>
											addUpdates(
												{
													...hotelInfoState,
													[hotelName]: { ...hotelInfo, Email: value },
												},
												hotelInfo.HotelID
											)
										}
									>
										<EditablePreview />
										<EditableInput />
									</Editable>
								</div>
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<PhoneIcon
										className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<Editable
										className="mt-1 text-sm leading-6 text-gray-500 sm:mt-0"
										defaultValue={hotelInfo.PhoneNumber}
										onSubmit={(value) =>
											addUpdates(
												{
													...hotelInfoState,
													[hotelName]: { ...hotelInfo, PhoneNumber: value },
												},
												hotelInfo.HotelID
											)
										}
									>
										<EditablePreview />
										<EditableInput />
									</Editable>
								</div>
								<div className="mt-2 flex items-center text-sm text-gray-500">
									<StarIcon
										className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<Editable
										className="mt-1 text-sm leading-6 text-gray-500 sm:mt-0"
										defaultValue={hotelInfo.Stars}
										onSubmit={(value) =>
											addUpdates(
												{
													...hotelInfoState,
													[hotelName]: { ...hotelInfo, Stars: value },
												},
												hotelInfo.HotelID
											)
										}
									>
										<EditablePreview />
										<EditableInput />
									</Editable>
								</div>
							</div>
						</div>
						<TableContainer>
							<Table variant="striped" colorScheme="pink">
								<TableCaption>
									<Link
										href={`/AddRoom/${hotelInfo.HotelID}${hotelInfo.ChainID}`}
									>
										<PlusIcon
											className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										Insert room for {hotelName}.
									</Link>
								</TableCaption>
								<Thead>
									<Tr>
										<Th isNumeric>RoomID</Th>
										<Th>Amenities</Th>
										<Th>View</Th>
										<Th isNumeric>Capacity</Th>
										<Th isNumeric>Price</Th>
									</Tr>
								</Thead>
								<Tbody>
									{hotelInfo.Rooms.map((room, index) => (
										<Tr key={room.RoomID}>
											<Td>
												<div className="flex">
													<XMarkIcon
														onClick={() => deleteRoom(room.RoomID)}
														className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 cursor-pointer"
														aria-hidden="true"
													/>
													{room.RoomID}
												</div>
											</Td>
											<Td>
												<Editable
													defaultValue={room.Amenities}
													onSubmit={(value) =>
														addUpdates(
															{
																...hotelInfoState,
																[hotelName]: {
																	...hotelInfo,
																	Rooms: [
																		...hotelInfo.Rooms.filter(
																			(Room) => Room.RoomID !== room.RoomID
																		),
																		{ ...room, Amenities: value },
																	],
																},
															},
															hotelInfo.HotelID,
															room.RoomID
														)
													}
												>
													<EditablePreview />
													<EditableInput />
												</Editable>
											</Td>
											<Td>
												<Editable
													defaultValue={room.View}
													onSubmit={(value) =>
														addUpdates(
															{
																...hotelInfoState,
																[hotelName]: {
																	...hotelInfo,
																	Rooms: [
																		...hotelInfo.Rooms.filter(
																			(Room) => Room.RoomID !== room.RoomID
																		),
																		{ ...room, View: value },
																	],
																},
															},
															hotelInfo.HotelID,
															room.RoomID
														)
													}
												>
													<EditablePreview />
													<EditableInput />
												</Editable>
											</Td>
											<Td isNumeric>
												<Editable
													defaultValue={room.Capacity}
													onSubmit={(value) =>
														addUpdates(
															{
																...hotelInfoState,
																[hotelName]: {
																	...hotelInfo,
																	Rooms: [
																		...hotelInfo.Rooms.filter(
																			(Room) => Room.RoomID !== room.RoomID
																		),
																		{ ...room, Capacity: value },
																	],
																},
															},
															hotelInfo.HotelID,
															room.RoomID
														)
													}
												>
													<EditablePreview />
													<EditableInput />
												</Editable>
											</Td>
											<Td isNumeric>
												<Editable
													defaultValue={`\$${room.Price}`}
													onSubmit={(value) =>
														addUpdates(
															{
																...hotelInfoState,
																[hotelName]: {
																	...hotelInfo,
																	Rooms: [
																		...hotelInfo.Rooms.filter(
																			(Room) => Room.RoomID !== room.RoomID
																		),
																		{ ...room, Price: value },
																	],
																},
															},
															hotelInfo.HotelID,
															room.RoomID
														)
													}
												>
													<EditablePreview />
													<EditableInput />
												</Editable>
											</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</div>
				))}
			</form>
		</div>
	);
}
// onChange={(value) =>
//     setHotelInfoState({
//         ...hotelInfoState,
//         hotelInfo: { ..., Manager: value },
//     })
// }
