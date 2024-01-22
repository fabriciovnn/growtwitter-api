import { NextFunction, Request, Response } from "express";

export class CadastroUsuario {
  public validar(req: Request, res: Response, next: NextFunction) {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: "Faltam Campos!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem:
          "É necessário informar o mínimo de 6 caracteres para password",
      });
    }

    return next();
  }
}
