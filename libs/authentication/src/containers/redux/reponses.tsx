import { Blob } from "buffer"
import internal from "stream"

export interface LoginResponse {
    username: string,
    email: string,
    role: string,
    token: string
}

export interface PersonReview {
    name: string,
    message: string,
    average: never
}

export interface RestaurantResponse{
    id: number,
    name: string,
    description: string,
    rating: number,
    category: string,
    status: string,
    review: CategoryReview,
    latitude: number,
    longitude: number,
    image: Blob
}

export interface CategoryReview {
    food: number,
    staff: number,
    location: number,
    price: number,
    average: number
}

export interface RestaurantState {
    restaurants: RestaurantResponse[],
    restaurant: RestaurantResponse,
    isLoggedIn: boolean,
    user: LoginResponse | undefined,
    reviews: PersonReview[],
    review: CategoryReview,
    toastError: string,
    toastSuccess: string,
    image: string,
    reservations: BookingRequest[],
    houses: HouseResponse[],
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