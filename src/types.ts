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

export type User = {
	CustomerID: number;
	Email: string;
	CustomerName: string;
	Address: string;
	SSN: string;
	RegistrationDate: Date;
	Password: string;
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
