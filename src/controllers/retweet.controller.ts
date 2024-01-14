import { Request, Response } from "express";
import { RetweetService } from "../services";

export class RetweetController {
  public async cadastrar(req: Request, res: Response) {
    try {
      const { content, type } = req.body;
      const userId = req.usuario.id;
      const { tweetId } = req.params;

      const service = new RetweetService();
      const response = await service.cadastrar({
        content,
        type,
        tweetId,
        userId,
      });

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
