import { users, product, purchase, creatUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, purchaseFromUser } from "./database";
import { CATEGORY } from "./enum";

console.log("\n -------------exercicio 1--------------- \n")

creatUser("2", "Ma@gmail.com", "123456789")

getAllUsers()

console.log("\n -------------exercicio 2--------------- \n ")

createProduct("6", "boneco luxuoso", 800, CATEGORY.DOLL)

getAllProducts()

getProductById("6")

console.log("\n -------------exercicio 3--------------- \n")

queryProductsByName("boneco")

createPurchase("u003", "6", 2, 1600)

purchaseFromUser("1")