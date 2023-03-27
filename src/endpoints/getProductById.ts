import { Request, Response } from "express";
import { product } from "../database";

export const getProductById = (req: Request, res: Response) => {
  const searchProductName = req.query.q as string;
  const productFind = product.find((prod) => {
    return prod.name.toLowerCase().includes(searchProductName.toLowerCase());
  });

  if (productFind) {
    res.status(200).send(productFind);
  } else {
    res.status(400).send("Não foi possível encontrar o produto pesquisado");
  }
};
