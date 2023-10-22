import { NextFunction, Request, Response } from "express";

export class CadastroUsuario {
  public validar(req: Request, res: Response, next: NextFunction) {
    const {name, email, username, password} = req.body

    if(!name || !email || !username || !password) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: 'É obrigatório informar os campos: name, email, username e password',
      });
    }

    if(password.length < 8) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: 'É necessário informar o mínimo de 8 caracteres para password'
      });
    }

    return next();
  }
}