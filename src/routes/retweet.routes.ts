import { Router } from "express";
import { RetweetController } from "../controllers";
import { Auth } from "../middlewares";

export function retweetRoutes() {
  const router = Router();
  const auth = new Auth();
  const controller = new RetweetController();

  router.post("/:tweetId", [auth.validar], controller.cadastrar);

  return router;
}
