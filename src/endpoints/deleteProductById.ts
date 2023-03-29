import { Request, Response } from "express";
import { product } from "../database";

export const deleteProductById = (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const productIndex = product.findIndex((prod) => prod.id === productId);

    if (productIndex === -1) {
      res.status(404);
      throw new Error("Não foi possível encontrar o produto para a exclusão");
    }

    product.splice(productIndex, 1);
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
