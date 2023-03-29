import { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";

export const creatUser = (req: Request, res: Response) => {
  try {
    const id = req.body.id as string | undefined;
    const email = req.body.email as string;
    const password = req.body.password as string;

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
    if (email !== undefined) {
      if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i)) {
        res.status(400);
        throw new Error("email tem que o padrão exemplo@gmail.com");
      }
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("email tem que ser tipo string");
      }
      if (!email.length) {
        res.status(400);
        throw new Error("email precisa ter no mínimo 1 valor");
      }
    }
    if (password !== undefined) {
      if (typeof password !== "string") {
        res.status(400);
        throw new Error("password tem que ser tipo string");
      }
      if (!password.length) {
        res.status(400);
        throw new Error("password precisa ter no mínimo 1 valor");
      }
    }

    const userExist = users.find((user) => {
      return user.id === id || user.email === email;
    });

    if (userExist) {
      res.status(409);
      throw new Error("Usuário já existente");
    }

    users.push({
      id,
      email,
      password,
    });
    users.sort((a: TUser, b: TUser): any => {
      return a.id < b.id ? Number(a.id) - Number(b.id) : a.id + b.id;
    });
    res.status(201).send("Cadastrado com sucesso");
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
