import { NextFunction, Request, Response } from "express";

export class login {
  public validar(req: Request, res: Response, next: NextFunction) {
    const { username, password} = req.body

    if(!username || !password) {
      return res.status(400).json({
        ok: false,
        mensagem: 'Necessário informar username e password para efetuar o login!'
      })
    }

    return next();
  }
}