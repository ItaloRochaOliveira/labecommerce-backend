import { Request, Response } from "express";
import { purchase, users } from "../database";

export const getUserPurchaseById = (req: Request, res: Response) => {
  try {
    const searchUserId = req.params.id;

    const userExist = users.find((user) => user.id === searchUserId);

    if (!userExist) {
      res.status(404);
      throw new Error("Não foi possível encontrar o usuário com esse id");
    }

    const userHavePurchase = purchase.filter(
      (purc) => purc.userId === searchUserId
    );

    if (!userHavePurchase) {
      res.status(404);
      throw new Error("Não foi possível encontrar as compras desse usuário");
    }

    res.status(200).send(userHavePurchase);
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
