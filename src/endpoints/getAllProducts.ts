import { Request, Response } from "express";
import { product } from "../database";

export const getAllProducts = (req: Request, res: Response) => {
  res.status(200).send(product);
};
