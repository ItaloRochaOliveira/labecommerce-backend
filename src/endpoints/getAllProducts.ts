import { Request, Response } from "express";
import { db } from "../database/knex.";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.raw(`
      SELECT * FROM product;
    `);

    if (!products.length) {
      res.status(400);
      throw new Error("Array vazia, popule para ter resultados");
    }

    res.status(200).send(products);
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
