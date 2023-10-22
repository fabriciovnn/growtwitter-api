import { Router } from "express";

import { UsuarioController } from "../controllers";
import { CadastroUsuario, ValidarFormatoEmail, login } from "../middlewares";


export function usuarioRoutes() {
  const router = Router();
  const cadastroUsuario = new CadastroUsuario();
  const logarUsuario = new login();
  const formatoEmail = new ValidarFormatoEmail();

  const controller = new UsuarioController;

  router.post('/', [cadastroUsuario.validar, formatoEmail.validar], controller.create);
  router.post('/login', [logarUsuario.validar, formatoEmail.validar], controller.login);

  return router;
}