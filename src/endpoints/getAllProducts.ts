import { Request, Response } from "express";
import { product } from "../database";

export const getAllProducts = (req: Request, res: Response) => {
  try {
    res.status(200).send(product);
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
