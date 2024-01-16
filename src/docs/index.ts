import {
  badRequest,
  notFound,
  securitySchemes,
  serverError,
  unauthorized,
} from "./components";
import { usuariosLoginPath, usuariosPath } from "./paths";
import { error, usuarioSchema } from "./schemas";

const docs = {
  openapi: "3.0.0",
  info: {
    title: "API GrowTwitter",
    description: "Endpoints do Projeto GrowTwitter",
    version: "1.0.0",
    contact: {
      email: "fbrcvnn@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8080",
    },
  ],
  paths: {
    "/usuarios": usuariosPath,
    "/usuarios/login": usuariosLoginPath,
    "/usuarios/{id}": {},
    "/tweets": {},
    "/likes/{tweetId}": {},
    "/likes/{id}": {},
    "/retweets/{tweetId}": {},
    "/followers/{followerId}": {},
    "/followers/{id}": {},
  },
  components: {
    badRequest: badRequest,
    notFound: notFound,
    unauthorized: unauthorized,
    serverError: serverError,
    securitySchemes: securitySchemes,
  },
  schemas: {
    error: error,
    usuario: usuarioSchema,
  },
};

export default docs;
