import { Request, Response } from "express";
import { purchase, users } from "../database";
import { db } from "../database/knex.";

export const getUserPurchaseById = async (req: Request, res: Response) => {
  try {
    const searchUserId = req.params.id;

    const userExist = await db("users").where("id", searchUserId);

    if (!userExist.length) {
      res.status(404);
      throw new Error("Não foi possível encontrar o usuário com esse id");
    }

    const userHavePurchase = await db
      .select(
        "purchases.id",
        "purchases.total_price",
        db.raw(
          "case when purchases.paid = 0 then 'false' else 'true' end AS isPaid"
        ),
        "purchases.delivered_at",
        "purchases.buyed_id",
        "users.email",
        "users.name"
      )
      .from("purchases")
      .where("buyed_id", searchUserId)
      .innerJoin("users", "users.id", "purchases.buyed_id");

    if (!userHavePurchase.length) {
      res.status(404);
      throw new Error("Não foi possível encontrar as compras desse usuário");
    }

    const productsList = await db
      .select("product.*")
      .from("purchases_products")
      .where("purchases_products.purchase_id", userHavePurchase[0].id)
      .innerJoin("product", "product.id", "purchases_products.product_id");

    userHavePurchase[0] = { ...userHavePurchase[0], productsList };

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
