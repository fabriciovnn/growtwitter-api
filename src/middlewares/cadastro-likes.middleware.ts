import { NextFunction, Request, Response } from "express";
import { TweetService } from "../services";


export class CadastroLike {
  public async validar(req: Request, res: Response, next: NextFunction) {
    const {tweetId} = req.body

    const service = new TweetService();

   const tweetEncontrado = await service.verificarTweetExistente(tweetId)

   if(!tweetEncontrado) {
    return res.status(400).json({
      ok: false,
      mensagem: 'Tweet não existe'
    })
   }

   next();
  }
}