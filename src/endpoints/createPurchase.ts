import { Request, Response } from "express";
import { product, purchase, users } from "../database";
import { TProduct, TPurchase } from "../types";
import { db } from "../database/knex.";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw Error("id com o tipo errado. Valor esperado: string");
      }
      if (!id.length) {
        res.status(400);
        throw new Error("id precisa ter no mínimo 1 valor");
      }
    }

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

    const purchaseExist = await db.raw(`
      SELECT * FROM purchases
      WHERE id = "${id}";
    `);
    console.log(purchaseExist);

    if (purchaseExist.length) {
      res.status(400);
      throw new Error("Compra já existente com esse id, tente um novo");
    }

    const users = await db.raw(`
      SELECT * FROM users
      WHERE id = "${userId}";
    `);

    if (!users.length) {
      res.status(404);
      throw new Error("usuário não encontrado");
    }

    const [product] = await db.raw(`
      SELECT price FROM product
      WHERE id = "${productId}"
    `);
    console.log(product);

    const totalPrice = product.price * quantity;

    const deliveredAt = new Date().toISOString();

    await db.raw(`
      INSERT INTO purchases(id, total_price, paid, delivered_at, buyed_id)
      VALUES("${id}", "${totalPrice}", "0", "${deliveredAt}", "${userId}" )
    `);

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
