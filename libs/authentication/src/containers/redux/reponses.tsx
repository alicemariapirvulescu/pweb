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
    pendingReservations: BookingRequest[],
    acceptedReservations: BookingRequest[],
    houses: HouseResponse[],
    myhouses: HouseResponse[],
    cities: string[],
    houseId: number
}

export interface BookingRequest{

    id: number,
    startDate: Date,
    endDate: Date,
    bookingStatus: string,
    houseName: string, 
    image: string,
    guestName: string,
    guestPhone: string,
    guestMessage: string,
    guestNo: number,
    ownerPhone: string,
    ownerName: string
  
}

export interface BookingResponse{
    approvedNotifications: BookingRequest[],
    pendingNotifications: BookingRequest[]
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