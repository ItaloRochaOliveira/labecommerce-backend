import { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";

export const creatUser = (req: Request, res: Response) => {
  const id = req.body.id as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  const userExist = users.find((user) => {
    return user.id === id || user.email === email;
  });

  if (userExist) {
    res.status(409).send("Usuário já existente");
  } else {
    if (
      typeof id !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).send("Objeto com valores errados");
    } else {
      users.push({
        id,
        email,
        password,
      });
      users.sort((a: TUser, b: TUser): any => {
        return a.id < b.id ? Number(a.id) - Number(b.id) : a.id + b.id;
      });
      res.status(201).send("Cadastrado com sucesso");
    }
  }
};
