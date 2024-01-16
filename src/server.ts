import cors from "cors";
import express from "express";
import { serve, setup } from "swagger-ui-express";
import docs from "./docs";
import { envs } from "./envs";
import {
  followerRoutes,
  likeRoutes,
  repliesRoutes,
  tweetRoutes,
  usuarioRoutes,
} from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/usuarios", usuarioRoutes());
app.use("/tweets", tweetRoutes());
app.use("/likes", likeRoutes());
app.use("/replies", repliesRoutes());
app.use("/followers", followerRoutes());
app.use("/docs", serve, setup(docs));

app.listen(envs.PORT, () => console.log(`Server running on port ${envs.PORT}`));
app.get("/", (_, res) => res.status(200).json({ ok: true }));
