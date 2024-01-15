import { Router } from "express";

import { UsuarioController } from "../controllers";
import {
  Auth,
  CadastroUsuario,
  ValidarFormatoEmail,
  ValidarFormatoId,
  login,
} from "../middlewares";

export function usuarioRoutes() {
  const router = Router();
  const cadastroUsuario = new CadastroUsuario();
  const logarUsuario = new login();
  const formatoEmail = new ValidarFormatoEmail();
  const formatoId = new ValidarFormatoId();
  const auth = new Auth();

  const controller = new UsuarioController();

  router.post(
    "/",
    [cadastroUsuario.validar, formatoEmail.validar],
    controller.create
  );
  router.post(
    "/login",
    [logarUsuario.validar, formatoEmail.validar],
    controller.login
  );
  router.get("/:id", [auth.validar, formatoId.validar], controller.listarPorId);

  return router;
}
