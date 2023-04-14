import { Request, Response } from "express";
import { db } from "../database/knex.";

export const editUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const id = req.body.id as string | undefined;
    const name = req.body.name as string | undefined;
    //   const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("Id tem que ser tipo string");
      }
      if (!id.length) {
        res.status(400);
        throw new Error("Id precisa ter no mínimo 1 caracter");
      }
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("name tem que ser tipo string");
      }
      if (!name.length) {
        res.status(400);
        throw new Error("name precisa ter no mínimo 1 caracter");
      }
    }

    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("newPassword tem que ser tipo string");
      }
      if (!newPassword.length) {
        res.status(400);
        throw new Error("newPassword precisa ter no mínimo 1 caracter");
      }
    }

    const idExist = userId === id;

    if (!idExist) {
      res.status(400);
      throw new Error(
        "id informado no parametro não bate com o informado no body"
      );
    }

    const [userForChange] = await db("users").where("id", userId);

    if (!userForChange) {
      res.status(404);
      throw new Error("Não foi possivel achar o usuário para atualização.");
    }

    //   if (userForChange.email === newEmail) {
    //     return res
    //       .status(200)
    //       .send("Email semelhante a anterior, tente outro email");
    //   }

    //   userForChange.email = newEmail || userForChange.email;

    await db("users").update({ password: newPassword, name }).where("id", id);

    res.status(200).send("Cadastro atualizado com sucesso!");
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
