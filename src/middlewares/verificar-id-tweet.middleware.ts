import { NextFunction, Request, Response } from "express";
import { TweetService } from "../services";

export class VerificarTweet {
  public async validar(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const service = new TweetService();
    const response = await service.listarPorId(id)

    if(!response.code) {
      return res.status(response.code).json(response)
    }

    return next();
  }
}