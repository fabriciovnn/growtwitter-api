import { NextFunction, Request, Response } from "express";

export class CadastroReplie {
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

    if (typeConvertido !== "R") {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: 'Type precisa ser "R" para criar um replie',
      });
    }

    req.body.type = typeConvertido;

    next();
  }
}
