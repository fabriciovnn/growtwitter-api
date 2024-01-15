import { Request, Response } from "express";
import { FollowerService } from "../services";

export class FollowerController {
  public async cadastrar(req: Request, res: Response) {
    try {
      const userId = req.usuario.id;
      const { followerId } = req.params;

      const service = new FollowerService();
      const response = await service.cadastrar({ userId, followerId });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }

  public async deletar(req: Request, res: Response) {}
}
