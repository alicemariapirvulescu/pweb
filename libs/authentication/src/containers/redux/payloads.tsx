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

export interface BookingDates {
    startDate: Date,
    endDate : Date
}

export interface BookingRequest{

    bookingPeriod : BookingDates,
    numPeople : number,
    messageGuest : string,
    numberGuest : number
}

export interface FilterRequest{

    city: string,
    numDays : number,
    numPeople : number
}

