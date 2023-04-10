import { Request, Response } from "express";
import { db } from "../database/knex.";

export const getProductByName = async (req: Request, res: Response) => {
  try {
    const searchProductName = req.query.q as string;

    if (searchProductName !== undefined && searchProductName.length < 1) {
      res.statusCode = 400;
      throw new Error("Precisa ter no mínimo um caracter");
    }

    const products = await db.raw(`
      SELECT * FROM produtos
      WHERE name LIKE "%${searchProductName}%" 
    `);

    if (!products.length) {
      res.statusCode = 404;
      throw new Error("Não foi possível encontrar o produto pesquisado");
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
