import { Request, Response } from "express";
import { users } from "../database";

export const editUserById = (req: Request, res: Response) => {
  const userId = req.params.id;

  //   const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as string | undefined;

  const userForChange = users.find((user) => user.id === userId);

  if (!userForChange) {
    return res
      .status(404)
      .send("Não foi possivel achar o usuário para atualização.");
  }

  //   if (userForChange.email === newEmail) {
  //     return res
  //       .status(200)
  //       .send("Email semelhante a anterior, tente outro email");
  //   }
  if (userForChange.password === newPassword) {
    return res
      .status(400)
      .send("Senha semelhante a anterior, tente outra senha");
  }

  //   userForChange.email = newEmail || userForChange.email;
  if (userForChange) {
    userForChange.password = newPassword || userForChange.password;
  }

  res.status(200).send("Cadastro atualizado com sucesso");
};
