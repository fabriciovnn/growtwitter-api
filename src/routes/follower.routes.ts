import { Router } from "express";
import { FollowerController } from "../controllers";
import {
  Auth,
  ValidarFormatoId,
  VerificarFollower,
  VerificarUsuario,
} from "../middlewares";

export function followerRoutes() {
  const router = Router();
  const auth = new Auth();
  const validarFormatoId = new ValidarFormatoId();
  const controller = new FollowerController();
  const verificarUsuario = new VerificarUsuario();
  const verificarFollower = new VerificarFollower();

  router.post(
    "/:followerId",
    [auth.validar, validarFormatoId.validar, verificarUsuario.validar],
    controller.cadastrar
  );
  router.delete(
    "/id",
    [auth.validar, validarFormatoId.validar, verificarFollower.validar],
    controller.deletar
  );

  return router;
}
