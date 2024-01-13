import { Router } from "express";
import { LikeController } from "../controllers";
import { Auth, ValidarFormatoId, VerificarTweet } from "../middlewares";

export function likeRoutes() {
  const router = Router();
  const controller = new LikeController();
  const auth = new Auth();
  const verificarTweet = new VerificarTweet();
  const validarFormatoId = new ValidarFormatoId();
  router.post(
    "/:idTweet",
    [auth.validar, validarFormatoId.validar, verificarTweet.validar],
    controller.cadastrar
  );
  router.delete(
    "/:id",
    [auth.validar, validarFormatoId.validar],
    controller.deletar
  );

  return router;
}
