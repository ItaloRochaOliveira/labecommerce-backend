import { Request, Response } from "express";
import { purchase, users } from "../database";
import { db } from "../database/knex.";

export const getUserPurchaseById = async (req: Request, res: Response) => {
  try {
    const searchUserId = req.params.id;

    const userExist = await db.raw(`
      SELECT * FROM users
      WHERE id = "${searchUserId}"
    `);

    if (!userExist.length) {
      res.status(404);
      throw new Error("Não foi possível encontrar o usuário com esse id");
    }

    const userHavePurchase = await db.raw(`
      SELECT * FROM purchases
      WHERE buyed_id = "${searchUserId}"
    `);

    if (!userHavePurchase.length) {
      res.status(404);
      throw new Error("Não foi possível encontrar as compras desse usuário");
    }

    res.status(200).send(userHavePurchase);
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
