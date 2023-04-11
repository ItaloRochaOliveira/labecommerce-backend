import { Request, Response } from "express";
import { db } from "../database/knex.";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db("users");

    if (!users.length) {
      res.statusCode = 404;
      throw new Error("Não há users cadastrados");
    }

    res.status(200).send(users);
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
