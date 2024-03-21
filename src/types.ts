export type Room = {
	RoomID: number;
	HotelID: number;
	ChainID: number;
	HotelName: string;
	Street: string;
	City: string;
	PostalCode: string;
	Country: string;
	Price: number;
	Capacity: number;
	View: string;
	Amenities: string;
	image_href: string;
	Category: number;
	Extendable: boolean;
};

export type SearchQuery = {
	startDate: string;
	endDate: string;
	country: string;
};

export interface Employee extends User {
	HotelID: number;
	ChainID: number;
	Role: string;
	Salary: number;
	HiringDate: Date;
}

export interface Customer extends User {
	RegistrationDate: Date;
}

export type User = {
	ID: number;
	Email: string;
	Password: string;
	Name: string;
	Address: string;
	SSN: string;
};

export type Booking = {
	BookingID: number;
	RoomID: number;
	HotelID: number;
	ChainID: number;
	BookingDate: Date;
	CustomerID: number;
	StartDate: Date;
	EndDate: Date;
	Price: number;
	HotelName: string;
	Street: string;
	City: string;
	PostalCode: string;
	Country: string;
	Capacity: number;
	View: string;
	Amenities: string;
	IssueDescription: string;
	image_href: string;
	Category: number;
	Extendable: boolean;
};

export type Renting = {
	RentingID: number;
	RoomID: number;
	HotelID: number;
	ChainID: number;
	CustomerID: number;
	EndDate: Date;
	BookingDate: Date;
	StartDate: Date;
	HotelName: string;
	Street: string;
	City: string;
	PostalCode: string;
	Country: string;
	Category: number; // Assuming Category is numeric
	Capacity: number;
	View: string;
	Extendable: boolean;
	Amenities: string[];
	Price: number;
	image_href: string;
	IssueDescription?: string; // IssueDescription is optional
};
