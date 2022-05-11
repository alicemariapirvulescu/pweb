import { Blob } from "buffer"

export interface LoginResponse {
    username: string,
    bearerToken: string,
    email: string,
    role: string
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
  //  schedule: string,
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
    user: LoginResponse,
    reviews: PersonReview[],
    review: CategoryReview,
    toastError: string,
    toastSuccess: string
}