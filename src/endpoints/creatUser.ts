import { Request, Response } from "express";
import { db } from "../database/knex.";

export const creatUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string | undefined;
    const name = req.body.name as string | undefined;
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
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("name tem que ser tipo string");
      }
      if (!name.length) {
        res.status(400);
        throw new Error("name precisa ter no mínimo 1 valor");
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

    const users = await db.raw(`
      SELECT * FROM users
      WHERE id = "${id}"
      ORDER BY id ASC;
    `);

    if (users.length) {
      res.status(409);
      throw new Error("Usuário já existente");
    }

    await db.raw(`
      INSERT INTO users
      VALUES ("${id}", "${name}", "${email}", "${password}", "${new Date()}");
    `);

    // users.sort((a: TUser, b: TUser): any => {
    //   return a.id < b.id ? Number(a.id) - Number(b.id) : a.id + b.id;
    // });

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
