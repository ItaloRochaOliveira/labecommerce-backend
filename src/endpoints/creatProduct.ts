import { Request, Response } from "express";
import { product } from "../database";
import { CATEGORY } from "../enum";

export const createProduct = (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const category = req.body.category as CATEGORY;

  const productExist = product.find((prod) => {
    return prod.id === id || prod.name === name;
  });

  if (productExist) {
    res.status(409).send("Produto já existente");
  } else {
    if (typeof id !== "string") {
      return res
        .status(400)
        .send("Objeto com valores errados: id como string...");
    }
    if (typeof name !== "string") {
      return res
        .status(400)
        .send("Objeto com valores errados: name como string...");
    }
    if (typeof price !== "number") {
      return res
        .status(400)
        .send("Objeto com valores errados: price como name...");
    }
    if (typeof category !== "string") {
      return res
        .status(400)
        .send("Objeto com valores errados: category como string...");
    }
    // if (
    //   typeof id !== "string" ||
    //   typeof name !== "string" ||
    //   typeof price !== "number" ||
    //   typeof category !== "string"
    // ) {
    //   res.status(400).send("Objeto com valores errados: id como string...");
    // }
    product.push({
      id,
      name,
      price,
      category,
    });
    res.status(201).send("Cadastrado com sucesso");
  }
};
