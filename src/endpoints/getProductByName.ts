import { Request, Response } from "express";
import { product } from "../database";

export const getProductByName = (req: Request, res: Response) => {
  try {
    const searchProductName = req.query.q as string;
    const productFind = product.filter((prod) => {
      return prod.name.toLowerCase().includes(searchProductName.toLowerCase());
    });

    if (searchProductName !== undefined && searchProductName.length < 1) {
      res.statusCode = 400;
      throw new Error("Precisa ter no mínimo um caracter");
    }

    if (!productFind.length) {
      res.statusCode = 404;
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
