import cors from "cors";
import express from "express";
import { envs } from "./envs";
import {
  likeRoutes,
  retweetRoutes,
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
app.use("/retweets", retweetRoutes());

app.listen(envs.PORT, () => console.log(`Server running on port ${envs.PORT}`));
app.get("/", (_, res) => res.status(200).json({ ok: true }));
