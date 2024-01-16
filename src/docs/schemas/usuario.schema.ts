export const usuarioSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      summary: "ID do usuário",
      example: "fcf14690-9e08-407b-911c-12354409b9d7",
    },
    name: {
      type: "string",
      summary: "Nome Completo do Usuário",
      example: "João da Silva",
    },
    email: {
      type: "string",
      format: "email",
      summary: "E-mail do usuário que será utilizado para acessar a aplicação",
      example: "joao@teste.com",
    },
    username: {
      type: "string",
      summary: "Username do Usuário",
      example: "joao99",
    },
    imgUrl: {
      type: "string",
      summary: "Url da imagem para o perfil do usuário",
      example:
        "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/c/f/6/5/cf653697f1d97312fcb00674cd540c8d379a35ad.jpeg",
    },
  },
  required: ["id", "name", "email", "username"],
};
