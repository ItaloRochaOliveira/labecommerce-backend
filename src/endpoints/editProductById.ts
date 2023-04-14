import { Request, Response } from "express";
import { CATEGORY } from "../enum";
import { db } from "../database/knex.";

export const editProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const id = req.body.id as string;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw Error("id com o tipo errado. Valor esperado: string");
      }
      if (!id.length) {
        res.status(400);
        throw new Error("Id precisa ter no mínimo 1 caracter");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("newName com o tipo errado. Valor esperado: string");
      }
      if (!newName.length) {
        res.status(400);
        throw new Error("newName precisa ter no mínimo 1 caracter");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("newPrice com o tipo errado. Valor esperado: number");
      }
      if (newPrice < 0) {
        res.status(400);
        throw new Error("newPrice precisa tem que ser maior que 0");
      }
    }
    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error(
          "newDescription com o tipo errado. Valor esperado: string"
        );
      }
      if (!newDescription.length) {
        res.status(400);
        throw new Error("newDescription precisa ter no mínimo 1 caracter");
      }
    }

    const productExist = productId === id;

    if (!productExist) {
      res.status(400);
      throw new Error("id informado no parametro não bate com o do body");
    }

    const [product] = await db("product").where("id", productId);

    if (!product) {
      res.status(404);
      throw new Error("Não foi possivel achar o produto para atualização.");
    }

    const newProduct = {
      name: newName || product.name,
      price: newPrice || product.price,
      description: newDescription || product.description,
      imageUrl: newImageUrl || product.imageUrl,
    };

    await db("product").update(newProduct).where("id", productId);

    res.status(200).send("Cadastro atualizado com sucesso!");
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
