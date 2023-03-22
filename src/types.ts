import { CATEGORY } from "./enum"

export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: CATEGORY
}

export type TPurchase = {
    userId: string | undefined,
    product: string,
    quantity: number,
    totalPrice: number
}