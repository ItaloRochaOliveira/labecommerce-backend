import { Request, Response } from "express";
import { product, purchase, users } from "../database";
import { TProduct, TPurchase } from "../types";

export const createPurchase = (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;

    if (userId !== undefined) {
      if (typeof userId !== "string") {
        res.status(400);
        throw Error("userId com o tipo errado. Valor esperado: string");
      }
      if (!userId.length) {
        res.status(400);
        throw new Error("userId precisa ter no mínimo 1 valor");
      }
    }

    if (productId !== undefined) {
      if (typeof productId !== "string") {
        res.status(400);
        throw Error("productId com o tipo errado. Valor esperado: string");
      }
      if (!productId.length) {
        res.status(400);
        throw new Error("productId precisa ter no mínimo 1 valor");
      }
    }

    if (quantity !== undefined) {
      if (typeof quantity !== "number") {
        res.status(400);
        throw Error("quantity com o tipo errado. Valor esperado: number");
      }
      if (quantity < 1) {
        res.status(400);
        throw new Error("quantity precisa ser maior que 0");
      }
    }

    const userFound = users.find((user) => user.id === userId);

    if (!userFound) {
      res.status(404);
      throw new Error("usuário não encontrado");
    }

    const productPrice: TProduct = product.find((prod) => {
      return prod.id === productId;
    });

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice: productPrice.price * quantity,
    };

    purchase.push(newPurchase);

    res.status(201).send("compra realizada com sucesso.");
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
