import { Router } from "express";

import { UsuarioController } from "../controllers";
import { Auth, CadastroTweet, CadastroUsuario, login } from "../middlewares";

export function usuarioRoutes() {
  const router = Router();
  const cadastroUsuario = new CadastroUsuario();
  const logarUsuario = new login();
  const auth = new Auth();
  const cadastroTweet = new CadastroTweet();
  const controller = new UsuarioController;

  router.post('/', [cadastroUsuario.validar], controller.create);
  router.post('/login', [logarUsuario.validar], controller.login);
  router.post('/tweets', [auth.validar, cadastroTweet.validar], controller.createTweet)

  return router;
}