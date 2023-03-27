import { Request, Response } from "express";
import { product, purchase } from "../database";
import { TProduct, TPurchase } from "../types";

export const createPurchase = (req: Request, res: Response) => {
  const userId = req.body.userId as string;
  const productId = req.body.productId as string;
  const quantity = req.body.quantity as number;

  const productPrice: TProduct = product.find((prod) => {
    return prod.id === productId;
  });

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice: productPrice.price * quantity,
  };

  purchase.push(newPurchase);

  res.status(201).send({
    mensage: "compra realizada com sucesso.",
    newPurchase,
  });
};
