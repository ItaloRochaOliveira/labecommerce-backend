import { Request, Response } from "express";
import { db } from "../database/knex.";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

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
    if (description !== undefined) {
      if (typeof description !== "string") {
        res.status(400);
        throw new Error(
          "description com o tipo errado. Valor esperado: string"
        );
      }
      if (!description.length) {
        res.status(400);
        throw new Error("description precisa ter no mínimo 1 valor");
      }
    }

    if (imageUrl !== undefined) {
      if (typeof imageUrl !== "string") {
        res.status(400);
        throw new Error("imageUrl com o tipo errado. Valor esperado: string");
      }
      if (!imageUrl.length) {
        res.status(400);
        throw new Error("imageUrl precisa ter no mínimo 1 valor");
      }
    }

    const [products] = await db("product").where("id", id);

    if (products) {
      res.status(409);
      throw new Error("Produto já existente");
    }

    const newProduct = {
      id: id,
      name,
      price,
      description,
      imageUrl,
    };

    await db("product").insert(newProduct);

    res.status(201).send("Cadastrado com sucesso!");
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
