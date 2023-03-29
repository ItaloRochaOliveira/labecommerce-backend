import { Request, Response } from "express";
import { product } from "../database";
import { CATEGORY } from "../enum";

export const createProduct = (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const category = req.body.category as CATEGORY;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw Error("id com o tipo errado. Valor esperado: string");
      }
      if (!id.length) {
        res.status(400);
        throw new Error("Id precisa ter no mínimo 1 valor");
      }
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("name com o tipo errado. Valor esperado: string");
      }
      if (!name.length) {
        res.status(400);
        throw new Error("name precisa ter no mínimo 1 valor");
      }
    }
    if (price !== undefined) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("price com o tipo errado. Valor esperado: number");
      }
      if (price < 0) {
        res.status(400);
        throw new Error("price precisa tem que ser maior que 0");
      }
    }

    if (category !== undefined) {
      if (category !== CATEGORY.TOY && category !== CATEGORY.DOLL) {
        res.status(400);
        throw new Error(
          "categoria com o tipo errado, esperado brinquedo ou boneco como tipo"
        );
      }
    }

    const productExist = product.find((prod) => {
      return prod.id === id || prod.name === name;
    });

    if (productExist) {
      res.status(409);
      throw new Error("Produto já existente");
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
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("erro inesperado");
    }
  }
};
