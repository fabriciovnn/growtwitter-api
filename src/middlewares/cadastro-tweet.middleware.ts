import { NextFunction, Request, Response } from "express";

export class CadastroTweet {
  public validar(req: Request, res: Response, next: NextFunction) {
    const { content, type, userId, tweetId } = req.body

    if(!content || !type) {
      return res.status(400).json({
        ok: false,
        mensagem: 'É obrigatório informar os campos: content e type'
      })
    }


    next();
  }
}