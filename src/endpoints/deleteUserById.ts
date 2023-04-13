import { Request, Response } from "express";
import { db } from "../database/knex.";

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const [userExist] = await db("users").where("id", userId);

    if (!userExist) {
      res.status(404);
      throw new Error("Não foi possível encontrar o usuário");
    }

    await db("users").del().where("id", userId);

    res.status(200).send("User apagado com sucesso!");
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
