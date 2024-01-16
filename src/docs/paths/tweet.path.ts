export const tweetsPath = {
  post: {
    tags: ["Tweets"],
    summary: "Endpoint para cadastrar um tweet",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
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
            },
            required: ["content", "type"],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                code: {
                  type: "integer",
                  format: "int32",
                  summary: "Status code conforme padrão REST",
                  example: 201,
                },
                ok: {
                  type: "boolean",
                  summary: "Indica se a requisição deu certo ou não",
                  example: true,
                },
                mensagem: {
                  type: "string",
                  summary: "Mensagem amigável para mostrar ao usuário",
                  example: "Tweet cadastrado com sucesso!",
                },
                dados: {
                  $ref: "#/schemas/tweet",
                },
              },
              required: ["code", "ok", "mensagem", "dados"],
            },
          },
        },
      },
      400: {
        $ref: "#/components/badRequest",
      },
      401: {
        $ref: "#/components/unauthorized",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
  get: {
    tags: ["Tweets"],
    summary: "Endpoint para listar os tweets cadastrados",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                code: {
                  type: "integer",
                  format: "int32",
                  summary: "Status code conforme padrão REST",
                  example: 200,
                },
                ok: {
                  type: "boolean",
                  summary: "Indica se a requisição deu certo ou não",
                  example: true,
                },
                mensagem: {
                  type: "string",
                  summary: "Mensagem amigável para mostrar ao usuário",
                  example: "Tweets listados com sucesso!",
                },
                dados: {
                  type: "array",
                  summary: "Lista de tweets cadastrados",
                  items: {
                    $ref: "#/schemas/tweet",
                  },
                },
              },
              required: ["code", "ok", "mensagem", "dados"],
            },
          },
        },
      },
      400: {
        $ref: "#/components/badRequest",
      },
      401: {
        $ref: "#/components/unauthorized",
      },
      404: {
        $ref: "#/components/notFound",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
};
