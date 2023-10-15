import { Router } from "express";

import { UsuarioController } from "../controllers";
import { Auth, CadastroTweet, CadastroUsuario, login } from "../middlewares";
import { CadastroLike } from "../middlewares/cadastro-likes.middleware";

export function usuarioRoutes() {
  const router = Router();
  const cadastroUsuario = new CadastroUsuario();
  const logarUsuario = new login();
  const auth = new Auth();
  const cadastroTweet = new CadastroTweet();
  const cadastroLike = new CadastroLike();
  const controller = new UsuarioController;

  router.post('/', [cadastroUsuario.validar], controller.create);
  router.post('/login', [logarUsuario.validar], controller.login);
  router.post('/tweets', [auth.validar, cadastroTweet.validar], controller.createTweet);
  router.post('/likes', [auth.validar, cadastroLike.validar], controller.createLike)

  return router;
}