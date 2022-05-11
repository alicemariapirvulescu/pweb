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