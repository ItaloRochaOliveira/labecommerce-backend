import { TProduct, TPurchase, TUser } from "./types";

export const users: TUser[] = [
    {
        id: "0",
        email: "italo@gmail.com",
        password: "40028922"
    },
    {
        id: "1",
        email: "italo2@gmail.com",
        password: "400289222"
    }
]

export const product: TProduct[] = [
    {
        id: "0",
        name: "cadeira",
        price: 200,
        category: "mobília"
    },
    {
        id: "1",
        name: "mesa",
        price: 400,
        category: "mobília"
    }
]

function existeIdNoUser(id:string):string | undefined {
    const idEncontrado = users.find((user) => user.id === id)
    return idEncontrado?.id
}

//tentativa de função
// function produtoPurchase(id:string, quantidade:number):{product: string | undefined, quantity: number, totalPrice: number}{
//     const idEncontrado = product.find((prod) => prod.id === id)
//     return {
//         product: idEncontrado?.id,
//         quantity: quantidade,
//         totalPrice: idEncontrado?.price? * quantidade
//     }
// }

export const purchase: TPurchase[] = [
    {
        userId: existeIdNoUser("0"),
        product: "1",
        quantity: 2,
        totalPrice: 800
    },
    {
        userId: users[0].id,
        product: product[0].id,
        quantity: 4,
        totalPrice: product[0].price * 4
    }
]