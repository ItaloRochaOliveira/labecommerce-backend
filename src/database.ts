import { CATEGORY } from "./enum";
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
        name: "Nave acustica",
        price: 70.10,
        category: CATEGORY.TOY
      },
      {
        id: "1",
        name: "Kit Sistema Solar",
        price: 89.99,
        category: CATEGORY.TOY
      },
      {
        id: "2",
        name: "Onibus espacial",
        price: 207,
        category: CATEGORY.TOY
      },
      {
        id: "3",
        name: "Briquedo de matematica com tematica astronauta",
        price: 267,
        category: CATEGORY.TOY
      },
      {
        id: "4",
        name: "6 peças de coelhos astronautas",
        price: 65,
        category: CATEGORY.DOLL
      },
      {
        id: "5",
        name: "Boneco astronauta com ornamento externo",
        price: 83,
        category: CATEGORY.DOLL
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

//funções

//exercicio 1

export const creatUser = (id:string, email:string, password:string):void => {
    const userExist = users.find((user) => {
        return user.id === id || user.email === email
    })

    if(userExist){
        console.log("usuario já existe")
    } else {
        users.push({
            id,
            email,
            password
        })
        console.log("Usuario cadastrado com sucesso")
        console.log("usuários: ", users, "\n")
    }
}

export const getAllUsers = ():void => {
    const userEmail = users.map((user) => {
        return user.email
    })
    console.log("emails: ", userEmail, "\n")
}

//exercicio 2

export const createProduct = (id: string, name: string, price: number, category: CATEGORY):void => {
    const productExist = product.find((prod) => {
        return prod.id === id || prod.name === name
    })

    if(productExist){
        console.log("produto já existe \n")
    } else {
        product.push({
            id,
            name,
            price,
            category
        })
        console.log("produto cadastrado com sucesso")
        console.log("produtos: ", product, "\n")
    }
}

export const getAllProducts = ():void => {
    const allProducts = product.map((prod) => {
        return prod.name
    })
    console.log("Todos os produtos: ", allProducts, "\n")
}

export const getProductById = (id:string):void => {
    const productFind = product.find((prod) => {
        return prod.id === id
    })

    if(productFind){
        console.log("Produto encontrado: ", productFind, "\n")
    } else {
        console.log("Produto inexistente \n")
    }
}

//exercicio 3

export const queryProductsByName = (q: string):void => {
    const productQuery = q !== "" && product.filter((prod) => {
        return prod.name.toLowerCase().includes(q.toLowerCase())
    })  
    //ou
    // const productQuery = q.length !== 0  ? product.filter((prod) => {
    //     return prod.name.toLowerCase().includes(q.toLowerCase())
    // }) : false

    if(productQuery){
        console.log("Lista de produtos com o nome pesquisado: ", productQuery, "\n")
    } else {
        console.log("Não foi possível encontrar produto pesquisado \n")
    }
}

export const createPurchase = (userId: string | undefined, product:string, quantity:number, totalPrice:number): void => {
    purchase.push({
        userId,
        product,
        quantity,
        totalPrice
    })

    console.log("purchase atualizado: ", purchase, "\n")
}

export const purchaseFromUser = (id: string):void => {
    const user = purchase.filter((purc) => {
        return purc.userId === id
    })

    if(user.length){
        console.log("Todas as compras desse usuário: ", user)
    } else {
        console.log("Não foi possível encontrar as compras desse user")
    }
}