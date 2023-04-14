import { Request, Response } from "express";
import { db } from "../database/knex.";

export const deletePurchaseById = async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const [purchaseExist] = await db("purchases").where("id", purchaseId);

    if (!purchaseExist) {
      res.status(404);
      throw new Error("Não foi possível encontrar a compra para a exclusão");
    }

    await db("purchases_products").del().where("purchase_id", purchaseId);

    await db("purchases").del().where("id", purchaseId);

    res.status(200).send("Produto apagado com sucesso!");
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
