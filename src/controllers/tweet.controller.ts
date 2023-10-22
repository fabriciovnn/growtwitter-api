import { Request, Response } from "express";
import { TweetService } from "../services";

export class TweetController {
  public async cadastrar(req: Request, res: Response) {
    try {
      const {content, type, userId} = req.body
      const service = new TweetService();
      
      const response = await service.cadastrar({content, type, userId});

      return res.status(response.code).json(response);

    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString()
      });
    }
  }

  public async listar(req: Request, res: Response) {
    try {
      const { user } = req.query

      const service = new TweetService();
      const response = await service.listarTodos(user as string | undefined);

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