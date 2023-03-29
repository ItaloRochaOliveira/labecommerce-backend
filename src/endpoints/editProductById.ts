import { Request, Response } from "express";
import { product } from "../database";
import { CATEGORY } from "../enum";

export const editProductById = (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const id = req.body.id as string;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as CATEGORY | undefined;

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

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("newName com o tipo errado. Valor esperado: string");
      }
      if (!newName.length) {
        res.status(400);
        throw new Error("newName precisa ter no mínimo 1 valor");
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

    if (newCategory !== undefined) {
      if (newCategory !== CATEGORY.TOY && newCategory !== CATEGORY.DOLL) {
        res.status(400);
        throw new Error(
          "categoria com o tipo errado, esperado brinquedo ou boneco como tipo"
        );
      }
    }

    const productExist = productId === id;

    if (!productExist) {
      res.status(400);
      throw new Error("id informado no parametro não bate com o do body");
    }

    const productForChange = product.find((prod) => prod.id === productId);

    if (!productForChange) {
      res.status(404);
      throw new Error("Não foi possivel achar o produto para atualização.");
    }

    productForChange.name = newName || productForChange.name;
    productForChange.price = isNaN(newPrice)
      ? productForChange.price
      : newPrice;
    productForChange.category = newCategory || productForChange.category;

    res.status(200).send("Cadastro atualizado com sucesso");
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
