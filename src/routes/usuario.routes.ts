import { Router } from "express";

export function usuarioRoutes() {
  const router = Router();

  router.post('/', () => console.log('chamou'))

  return router;
}