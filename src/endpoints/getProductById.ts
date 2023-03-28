import { Request, Response } from "express";
import { product } from "../database";

export const getProductById = (req: Request, res: Response) => {
  const searchProductId = req.params.id;

  const productFind = product.find((prod) => prod.id === searchProductId);

  if (!productFind) {
    return res
      .status(400)
      .send("Não foi possível encontrar o produto pesquisado");
  }

  res.status(200).send(productFind);
};
