import { NextFunction, Request, Response } from "express";

export class ValidarFormatoId {
  public async validar(req: Request, res: Response, next: NextFunction) {
    const { idTweet } = req.params;

    if (idTweet.length !== 36) {
      return res.status(400).json({
        code: 400,
        ok: false,
        mensagem: "Formato do ID inválido",
      });
    }

    return next();
  }
}
