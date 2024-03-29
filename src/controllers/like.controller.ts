import { Request, Response } from "express";
import { LikeService } from "../services";

export class LikeController {
  public async cadastrar(req: Request, res: Response) {
    try {
      const userId = req.usuario.id;
      const { tweetId } = req.params;

      const service = new LikeService();
      const response = await service.cadastrar({ userId, tweetId });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      const userId = req.usuario.id;
      const { id } = req.params;

      const service = new LikeService();
      const response = await service.deletar({ userId, id });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }
}
