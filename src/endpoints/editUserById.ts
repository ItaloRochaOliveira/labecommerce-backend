import { Request, Response } from "express";
import { users } from "../database";

export const editUserById = (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const id = req.body.id as string | undefined;
    //   const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("Id tem que ser tipo string");
      }
      if (!id.length) {
        res.status(400);
        throw new Error("Id precisa ter no mínimo 1 valor");
      }
    }

    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("newPassword tem que ser tipo string");
      }
      if (!newPassword.length) {
        res.status(400);
        throw new Error("newPassword precisa ter no mínimo 1 valor");
      }
    }

    const idExist = userId === id;

    if (!idExist) {
      res.status(400);
      throw new Error(
        "id informado no parametro não bate com o informado no body"
      );
    }

    const userForChange = users.find((user) => user.id === userId);

    if (!userForChange) {
      res.status(404);
      throw new Error("Não foi possivel achar o usuário para atualização.");
    }

    //   if (userForChange.email === newEmail) {
    //     return res
    //       .status(200)
    //       .send("Email semelhante a anterior, tente outro email");
    //   }
    if (userForChange.password === newPassword) {
      res.status(400);
      throw new Error("Senha semelhante a anterior, tente outra senha");
    }

    //   userForChange.email = newEmail || userForChange.email;
    if (userForChange) {
      userForChange.password = newPassword || userForChange.password;
    }

    res.status(200).send("Cadastro atualizado com sucesso");
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
