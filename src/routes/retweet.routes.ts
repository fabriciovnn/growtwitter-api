import { Router } from "express";
import { RetweetController } from "../controllers";
import {
  Auth,
  CadastroRetweet,
  ValidarFormatoId,
  VerificarTweet,
} from "../middlewares";

export function retweetRoutes() {
  const router = Router();
  const auth = new Auth();
  const controller = new RetweetController();
  const cadastroRetweet = new CadastroRetweet();
  const verificarTweet = new VerificarTweet();
  const formatoId = new ValidarFormatoId();

  router.post(
    "/:tweetId",
    [
      auth.validar,
      formatoId.validar,
      cadastroRetweet.validar,
      verificarTweet.validar,
    ],
    controller.cadastrar
  );

  return router;
}
