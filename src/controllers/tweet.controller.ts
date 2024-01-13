import { Request, Response } from "express";
import { TweetService } from "../services";

export class TweetController {
  public async cadastrar(req: Request, res: Response) {
    try {
      const { content, type } = req.body;
      const userId = req.usuario.id;
      const service = new TweetService();

      const response = await service.cadastrar({ content, type, userId });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }

  public async listar(req: Request, res: Response) {
    try {
      const { userId } = req.query;

      const service = new TweetService();
      const response = await service.listarTodos(userId as string | undefined);

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
