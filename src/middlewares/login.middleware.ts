import { NextFunction, Request, Response } from "express";

export class login {
  public validar(req: Request, res: Response, next: NextFunction) {
    const { email, password} = req.body

    if(!email || !password) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: 'Faltam campos',
      });
    }

    return next();
  }
}