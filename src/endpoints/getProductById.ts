import { Request, Response } from "express";
import { db } from "../database/knex.";

export const getProductById = async (req: Request, res: Response) => {
  try {
    const searchProductId = req.params.id;

    const product = await db.raw(`
      SELECT * FROM product
      WHERE id = ${searchProductId}
    `);

    if (!product.length) {
      res.status(404);
      throw new Error("Não foi possível encontrar o produto pesquisado");
    }

    res.status(200).send(product);
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
