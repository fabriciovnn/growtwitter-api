import { Router } from "express";

import { UsuarioController } from "../controllers";
import { CadastroUsuario, login } from "../middlewares";

export function usuarioRoutes() {
  const router = Router();
  const cadastroUsuario = new CadastroUsuario();
  const logarUsuario = new login();
  const controller = new UsuarioController;

  router.post('/', [cadastroUsuario.validar], controller.create);
  router.post('/login', [logarUsuario.validar], controller.login)

  return router;
}