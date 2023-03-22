import { users, product, purchase, creatUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, purchaseFromUser } from "./database";
import { CATEGORY } from "./enum";

console.log("\n -------------exercicio 1--------------- \n")

creatUser("2", "Ma@gmail.com", "123456789")

getAllUsers()

console.log("\n -------------exercicio 2--------------- \n ")

createProduct("p004", "Monitor HD", 800, CATEGORY.ELECTRONICS)

getAllProducts()

getProductById("p004")

console.log("\n -------------exercicio 3--------------- \n")

queryProductsByName("")

createPurchase("u003", "p004", 2, 1600)

purchaseFromUser("1")