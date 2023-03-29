import express, { Request, Response } from "express";
import { users } from "../database";

export const getAllUsers = (req: Request, res: Response) => {
  try {
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
