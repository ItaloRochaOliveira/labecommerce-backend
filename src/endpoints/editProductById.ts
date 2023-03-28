import { Request, Response } from "express";
import { product } from "../database";
import { CATEGORY } from "../enum";

export const editProductById = (req: Request, res: Response) => {
  const productId = req.params.id;

  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as CATEGORY | undefined;

  const productForChange = product.find((prod) => prod.id === productId);

  if (!productForChange) {
    return res
      .status(404)
      .send("Não foi possivel achar o produto para atualização.");
  }

  productForChange.name = newName || productForChange.name;
  productForChange.price = isNaN(newPrice) ? productForChange.price : newPrice;
  productForChange.category = newCategory || productForChange.category;

  res.status(200).send("Cadastro atualizado com sucesso");
};
