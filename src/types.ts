export type Room = {
    RoomID: number;
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