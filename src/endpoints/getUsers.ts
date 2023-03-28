import express, { Request, Response } from "express";
import { users } from "../database";

export const getAllUsers = (req: Request, res: Response) => {
  if (!users.length) {
    res.status(404).send("Não há users cadastrados");
  }

  res.status(200).send(users);
};
