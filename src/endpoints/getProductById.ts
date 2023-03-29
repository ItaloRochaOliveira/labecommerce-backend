import { Request, Response } from "express";
import { product } from "../database";

export const getProductById = (req: Request, res: Response) => {
  try {
    const searchProductId = req.params.id;

    const productFind = product.find((prod) => prod.id === searchProductId);

    if (!productFind) {
      res.status(404);
      throw new Error("Não foi possível encontrar o produto pesquisado");
    }

    res.status(200).send(productFind);
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
