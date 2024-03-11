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
	Password: string;
};
