import { Blob } from "buffer"
import internal from "stream"

export interface LoginResponse {
    username: string,
    email: string,
    role: string,
    token: string
}

export interface RefugeeState {
    isLoggedIn: boolean,
    user: LoginResponse | undefined,
    toastError: string,
    toastSuccess: string,
    reservations: BookingRequest[],
    houses: HouseResponse[],
    myhouses: HouseResponse[],
    cities: string[]
}

export interface BookingRequest{
    nameHouse: string,
    numPeople: number,
    startPeriod: Date,
    endPeriod: Date,
    nameGuest: string,
    phoneGuest: string,
    message: string,
}

export interface HouseResponse {
    id: number,
    address: string, 
    name: string,
    description: string,
    city: string,
    phone: string, 
    latitude: number,
    longitude: number,
    capacity: number, 
    bookingPeriod: number,
    image: string
}