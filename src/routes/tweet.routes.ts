import { Router } from "express";
import { Auth, CadastroTweet } from "../middlewares";
import { TweetController } from "../controllers/tweet.controller";


export function tweetRoutes() {
  const router = Router();
  const cadastroTweet = new CadastroTweet();
  const auth = new Auth();
  const controller = new TweetController();

  router.post('/', [auth.validar, cadastroTweet.validar], controller.cadastrar)
  router.get('/', [auth.validar], controller.listar)

  return router;
}