import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { JWTAdapter } from "../adapters";
import { envs } from "../envs";

export class Auth {
  public async validar(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({
        code: 401,
        ok: false,
        mensagem: "Token é obrigatório",
      });
    }

    const token = auth.split(" ")[1];

    try {
      const jwt = new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
      const usuarioAutenticado = jwt.decodificarToken(token);

      if (!usuarioAutenticado) {
        return res.status(401).json({
          code: 401,
          ok: false,
          mensagem: "Token inválido",
        });
      }

      req.usuario = usuarioAutenticado;
      return next();
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
          code: 401,
          ok: false,
          mensagem: "Token inválido ou expirado",
        });
      }

      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: "Ops! Deu algo errado no servidor",
      });
    }
  }
}
