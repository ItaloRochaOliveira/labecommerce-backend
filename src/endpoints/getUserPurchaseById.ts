import { Request, Response } from "express";
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
        "purchases.id AS purchaseId",
        "purchases.total_price AS totalPrice",
        db.raw(
          "case when purchases.paid = 0 then 'false' else 'true' end AS isPaid"
        ),
        "purchases.delivered_at AS deliveredAt",
        "purchases.buyed_id AS buyedId",
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

    const productsList: any = [];

    for (let purchase of userHavePurchase) {
      const result: any = await db
        .select("product.*", "purchases_products.quantity")
        .from("purchases_products")
        .where("purchases_products.purchase_id", purchase.purchaseId)
        .innerJoin("product", "product.id", "purchases_products.product_id");

      purchase = { ...purchase, products: result };

      productsList.push(purchase);
    }

    res.status(200).send(productsList);
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
