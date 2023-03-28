import { Request, Response } from "express";
import { purchase } from "../database";

export const getUserPurchaseById = (req: Request, res: Response) => {
  const searchUserId = req.params.id;

  const userFound = purchase.find((purc) => purc.userId === searchUserId);

  if (!userFound) {
    return res
      .status(404)
      .send("Não foi possível encontrar as compras desse usuário");
  }

  res.status(200).send(userFound);
};
