import { Router } from "express";
import { CadastroUsuario } from "../middlewares/cadastro-usuario.middleware";
import { UsuarioController } from "../controllers";

export function usuarioRoutes() {
  const router = Router();
  const cadastroUsuario = new CadastroUsuario();
  const controller = new UsuarioController;

  router.post('/', [cadastroUsuario.validar], controller.create);

  return router;
}