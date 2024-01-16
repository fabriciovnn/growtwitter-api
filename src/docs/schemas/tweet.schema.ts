export const tweetSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      summary: "ID do tweet",
      example: "fcf14690-9e08-407b-911c-12354409b9d7",
    },
    type: {
      type: "string",
      summary: "Tipo do Tweet - T para Tweet e R para Replie",
      example: "T",
    },
    content: {
      type: "string",
      summary: "Conteudo do Tweet",
      example: "Hello World",
    },
    userId: {
      type: "string",
      format: "uuid",
      summary: "ID do usuario que criou o tweet",
      example: "fcf14690-9e08-407b-911c-12354409b9d7",
    },
    replies: {
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          summary: "ID do Replie",
          example: "fcf14690-9e08-407b-911c-12354409b9d7",
        },
        type: {
          type: "string",
          summary: "Tipo do Tweet - T para Tweet e R para Replie",
          example: "R",
        },
        content: {
          type: "string",
          summary: "Conteudo do Replie",
          example: "Tirou a maldição do programador!",
        },
        userId: {
          type: "string",
          format: "uuid",
          summary: "ID do usuario que criou o replie",
          example: "fcf14690-9e08-407b-911c-12354409b9d7",
        },
        tweetId: {
          type: "string",
          format: "uuid",
          summary: "ID do tweet que foi dado o replie",
          example: "fcf14690-9e08-407b-911c-12354409b9d7",
        },
      },
    },
  },
  required: ["id", "type", "content", "userId"],
};
