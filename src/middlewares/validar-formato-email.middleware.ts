import { NextFunction, Request, Response } from "express";

export class ValidarFormatoEmail {
  public async validar(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body

    if(!email.includes('@') || !email.includes('.com')) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: 'E-mail inválido',
      })
    }

    return next();
  }
}