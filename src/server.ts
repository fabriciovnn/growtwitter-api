import { envs } from "./envs";
import { createServer } from "./express.server";

const server = createServer();

server.listen(envs.PORT, () =>
  console.log(`Server running on port ${envs.PORT}`)
);
