import {
  badRequest,
  notFound,
  securitySchemes,
  serverError,
  unauthorized,
} from "./components";
import {
  tweetsPath,
  usuariosLoginPath,
  usuariosPath,
  usuariosWithIdPath,
} from "./paths";
import { error, tweetSchema, usuarioSchema } from "./schemas";

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
    "/usuarios/{id}": usuariosWithIdPath,
    "/tweets": tweetsPath,
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
    tweet: tweetSchema,
  },
};

export default docs;
