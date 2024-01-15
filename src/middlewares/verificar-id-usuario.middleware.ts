import { NextFunction, Request, Response } from "express";
import { UsuarioService } from "../services";

export class VerificarUsuario {
  public async validar(req: Request, res: Response, next: NextFunction) {
    const { followerId } = req.params;

    const service = new UsuarioService();
    const response = await service.listarPorId(followerId);

    if (!response.code) {
      return res.status(response.code).json(response);
    }

    return next();
  }
}
