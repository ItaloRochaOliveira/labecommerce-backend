import { Request, Response } from "express";
import { users } from "../database";

export const deleteUserById = (req: Request, res: Response) => {
  const userId = req.params.id;

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).send("Não foi possível encontrar o usuário");
  }

  users.splice(userIndex, 1);
  res.status(200).send("User apagado com sucesso");
};
