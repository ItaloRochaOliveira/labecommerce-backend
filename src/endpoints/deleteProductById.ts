import { Request, Response } from "express";
import { db } from "../database/knex.";

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const [productExist] = await db("product").where("id", productId);

    if (!productExist) {
      res.status(404);
      throw new Error("Não foi possível encontrar o produto para a exclusão");
    }

    await db("product").del().where("id", productId);

    res.status(200).send("Produto apagado com sucesso");
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
