import { Router } from "express";
import { ReplieController } from "../controllers";
import {
  Auth,
  CadastroReplie,
  ValidarFormatoId,
  VerificarTweet,
} from "../middlewares";

export function repliesRoutes() {
  const router = Router();
  const auth = new Auth();
  const controller = new ReplieController();
  const cadastroReplie = new CadastroReplie();
  const verificarTweet = new VerificarTweet();
  const formatoId = new ValidarFormatoId();

  router.post(
    "/:tweetId",
    [
      auth.validar,
      formatoId.validar,
      cadastroReplie.validar,
      verificarTweet.validar,
    ],
    controller.cadastrar
  );

  return router;
}
