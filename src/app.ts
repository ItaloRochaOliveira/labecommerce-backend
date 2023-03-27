import express, { Request, Response } from "express";
import cors from "cors";
import { getAllUsers } from "./endpoints/getUsers";
import { getAllProducts } from "./endpoints/getAllProducts";
import { getProductById } from "./endpoints/getProductById";
import { getAllPurchase } from "./endpoints/getAllPurchase";
import { creatUser } from "./endpoints/creatUser";
import { createProduct } from "./endpoints/creatProduct";
import { createPurchase } from "./endpoints/createPurchase";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//all get:
app.get("/users", getAllUsers);
app.get("/products", getAllProducts);
app.get("/products/search", getProductById);
app.get("/purchase", getAllPurchase);

//all post:
app.post("/users", creatUser);
app.post("/products", createProduct);
app.post("/purchase", createPurchase);
