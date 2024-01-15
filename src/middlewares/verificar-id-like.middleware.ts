import { NextFunction, Request, Response } from "express";
import { LikeService } from "../services";

export class VerificarLike {
  public async validar(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = req.usuario.id;

    const service = new LikeService();
    const response = await service.listarPorId({ id, userId });

    if (!response.code) {
      return res.status(response.code).json(response);
    }

    return next();
  }
}
