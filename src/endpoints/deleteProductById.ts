import { Request, Response } from "express";
import { product } from "../database";

export const deleteProductById = (req: Request, res: Response) => {
  const productId = req.params.id;

  const productIndex = product.findIndex((prod) => prod.id === productId);

  if (productIndex === -1) {
    return res
      .status(404)
      .send("Não foi possível encontrar o produto para a exclusão");
  }

  product.splice(productIndex, 1);
  res.status(200).send("Produto apagado com sucesso");
};
