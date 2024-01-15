import { Request, Response } from "express";
import { UsuarioService } from "../services";

export class UsuarioController {
  public async create(req: Request, res: Response) {
    try {
      const { name, email, username, password, imgUrl } = req.body;
      const service = new UsuarioService();

      const response = await service.cadastrar({
        name,
        email,
        username,
        password,
        imgUrl,
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

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const service = new UsuarioService();

      const response = await service.login({ email, password });

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }

  public async listarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = new UsuarioService();
      const response = await service.listarPorId(id);

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
