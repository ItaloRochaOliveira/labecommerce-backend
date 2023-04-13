import { Request, Response } from "express";
import { db } from "../database/knex.";

type TProduct = {
  productId: string;
  quantity: number;
};

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const userId = req.body.userId as string;
    const products = req.body.products;

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

    products.map((product: TProduct): void => {
      if (product.productId !== undefined) {
        if (typeof product.productId !== "string") {
          res.status(400);
          throw Error("productId com o tipo errado. Valor esperado: string");
        }
        if (!product.productId.length) {
          res.status(400);
          throw new Error("productId precisa ter no mínimo 1 valor");
        }
      }

      if (product.quantity !== undefined) {
        if (typeof product.quantity !== "number") {
          res.status(400);
          throw Error("quantity com o tipo errado. Valor esperado: number");
        }
        if (product.quantity < 1) {
          res.status(400);
          throw new Error("quantity precisa ser maior que 0");
        }
      }
    });

    const purchaseExist = await db("purchases").where("id", id);

    if (purchaseExist.length) {
      res.status(400);
      throw new Error("Compra já existente com esse id, tente um novo");
    }

    const users = await db("users").where("id", userId);

    if (!users.length) {
      res.status(404);
      throw new Error("usuário não encontrado");
    }

    // const [product] = await db("product").where("id", productId);
    // console.log(product);

    // const totalPrice = product.price * quantity;

    const totalPrice = products.map(
      async (product: TProduct): Promise<number> => {
        const productA = await db("product").where("id", product.productId);
        const total = product.quantity * productA[0].price;
        console.log(total);
        return total;
      }
    );
    console.log(totalPrice);

    // const deliveredAt = new Date().toISOString();

    // const newPurchase = {
    //   id,
    //   total_price: totalPrice,
    //   paid: "0",
    //   delivered_at: deliveredAt,
    //   buyed_id: userId,
    // };

    // await db("purchases").insert(newPurchase);

    // await db("purchases_products").insert({
    //   purchase_id: id,
    //   product_id: productId,
    //   quantity,
    // });

    // res.status(201).send("compra realizada com sucesso.");
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
