import express, { Request, Response } from "express";
import cors from "cors";
import { getAllUsers } from "./endpoints/getUsers";
import { getAllProducts } from "./endpoints/getAllProducts";
import { getProductByName } from "./endpoints/getProductByName";
import { getAllPurchase } from "./endpoints/getAllPurchase";
import { creatUser } from "./endpoints/creatUser";
import { createProduct } from "./endpoints/creatProduct";
import { createPurchase } from "./endpoints/createPurchase";
import { getProductById } from "./endpoints/getProductById";
import { getUserPurchaseById } from "./endpoints/getUserPurchaseById";
import { deleteUserById } from "./endpoints/deleteUserById";
import { deleteProductById } from "./endpoints/deleteProductById";
import { editUserById } from "./endpoints/editUserById";
import { editProductById } from "./endpoints/editProductById";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//all get:
app.get("/users", getAllUsers);
app.get("/users/:id/purchase", getUserPurchaseById);
app.get("/products", getAllProducts);
app.get("/products/search", getProductByName);
app.get("/products/:id", getProductById);
app.get("/purchase", getAllPurchase);

//all post:
app.post("/users", creatUser);
app.post("/products", createProduct);
app.post("/purchase", createPurchase);

//all delete:
app.delete("/users/:id", deleteUserById);
app.delete("/product/:id", deleteProductById);

//all put:
app.put("/users/:id", editUserById);
app.put("/products/:id", editProductById);
