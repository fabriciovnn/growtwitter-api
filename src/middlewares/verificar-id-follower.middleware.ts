import { NextFunction, Request, Response } from "express";
import { FollowerService } from "../services";

export class VerificarFollower {
  public async validar(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = req.usuario.id;

    const service = new FollowerService();
    const response = await service.listarPorId({ id, userId });
  }
}
