import { Request, Response } from "express";
import { purchase } from "../database";

export const getAllPurchase = (req: Request, res: Response) => {
  res.status(200).send(purchase);
};
