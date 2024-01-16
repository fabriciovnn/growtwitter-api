export const usuariosPath = {
  post: {
    tags: ["Usuarios"],
    summary: "Endpoint para cadastrar um usuário",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                summary: "Nome Completo do Usuário",
                example: "João da Silva",
              },
              email: {
                type: "string",
                format: "email",
                summary:
                  "E-mail do usuário que será utilizado para acessar a aplicação",
                example: "joao@teste.com",
              },
              username: {
                type: "string",
                summary: "Username do Usuário",
                example: "joao99",
              },
              password: {
                type: "string",
                summary:
                  "Senha do Usuário que será utilizada para acessar a aplicação",
              },
              imgUrl: {
                type: "string",
                summary: "Url da imagem para o perfil do usuário",
                example:
                  "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/c/f/6/5/cf653697f1d97312fcb00674cd540c8d379a35ad.jpeg",
              },
            },
            required: ["name", "email", "username", "password"],
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
                  example: "Usuário cadastrado com sucesso!",
                },
                dados: {
                  $ref: "#/schemas/usuario",
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
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
  get: {
    tags: ["Usuarios"],
    summary: "Endpoint para listar os usuarios cadastrados",
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
                  example: "Usuário cadastrado com sucesso!",
                },
                dados: {
                  $ref: "#/schemas/usuario",
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

export const usuariosLoginPath = {
  post: {
    tags: ["Usuarios"],
    summary: "Endpoint para logar um usuário cadastrado",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                format: "email",
                summary:
                  "E-mail do usuário que será utilizado para acessar a aplicação",
                example: "joao@teste.com",
              },
              password: {
                type: "string",
                summary:
                  "Senha do Usuário que será utilizada para acessar a aplicação",
              },
            },
            required: ["email", "password"],
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
                  example: "Usuário logado com sucesso!",
                },
                dados: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      format: "JWT",
                      summary:
                        "Token de autorização gerado a partir dos dados do aluno logado",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                    },
                    user: {
                      $ref: "#/schemas/usuario",
                    },
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
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
};

export const usuariosWithIdPath = {
  get: {
    tags: ["Usuarios"],
    summary: "Endpoint para buscar um usuario por ID",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID do usuario buscado",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
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
                  example: "Usuario encontrado com sucesso!",
                },
                dados: {
                  $ref: "#/schemas/usuario",
                },
              },
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
