export interface LoginPayload {
    username: string,
    password: string
}

export interface RegisterPayload {
    username: string,
    password: string,
    email:string,
    fullName: string,
    role: string
}

export interface ReviewPayload {
    restaurantId: number
    food: number,
    staff: number,
    place: number,
    price: number,
    message: string,
    username: string
}

export interface HouseRequest{
    description: string,
    phone: string,
    latitude: number,
    longitude: number,
    capacity: number,
    bookingPeriod: number,
    image: string,
    name: string,
    address: string,
    city: string
}

export interface BookingRequest{

    startDate: Date,
    endDate: Date,
    city: string,
    phone: string,
    capacity: number
}

export interface FilterRequest{

    city: string,
    numDays : number,
    numPeople : number
}

export interface BookingUpdateRequest{
    bookingId : number ;
    bookingStatus: string;
}

export interface NewBookingRequest{

    startDate: any | undefined,
    endDate: any | undefined,
    phone: string,
    message: string,
    peopleNo: string,
    houseId: number

}

