import { NextFunction, Request, Response } from "express";

export class CadastroTweet {
  public validar(req: Request, res: Response, next: NextFunction) {
    const { content, type } = req.body;

    if (!content || !type) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: "Faltam campos!",
      });
    }

    let typeConvertido = "";
    if (typeof type === "string") {
      typeConvertido = type.toUpperCase();
    }

    if (typeConvertido !== "T") {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: 'Type precisa ser "T" para criar um tweet',
      });
    }

    req.body.type = typeConvertido;

    next();
  }
}
