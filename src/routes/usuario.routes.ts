import { Router } from "express";
import { CadastroUsuario } from "../middlewares/cadastro-usuario.middleware";

export function usuarioRoutes() {
  const router = Router();
  const cadastroUsuario = new CadastroUsuario();

  router.post('/', [cadastroUsuario.validar], () => console.log('chamou'))

  return router;
}