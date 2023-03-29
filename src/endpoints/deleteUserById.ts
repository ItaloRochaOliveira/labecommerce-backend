import { Request, Response } from "express";
import { users } from "../database";

export const deleteUserById = (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.status(404);
      throw new Error("Não foi possível encontrar o usuário");
    }

    users.splice(userIndex, 1);
    res.status(200).send("User apagado com sucesso");
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
