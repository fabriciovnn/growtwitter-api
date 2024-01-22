import request from "supertest";
import { createServer } from "../../src/express.server";
import repository from "../../src/repositories/prisma.connection";

describe("Usuario Routes", () => {
  const server = createServer();
  afterEach(async () => {
    console.log("Executou o afterEach");
    await repository.usuario.deleteMany();
  });

  jest.setTimeout(100000);

  describe("Cadastrar - POST", () => {
    it("Deve retornar 400 quando faltar propriedades no body", async () => {
      const result = await request(server).post("/usuarios").send();

      expect(result.statusCode).toBe(400);
      expect(result.body).toHaveProperty("ok", false);
      expect(result.body).toHaveProperty("mensagem", "Faltam Campos!");
    });

    it("Deve retornar 400 quando o password informado for menor que 6 caracteres", async () => {
      const result = await request(server).post("/usuarios").send({
        name: "Joao Da Silva",
        password: "123",
        email: "joao@teste.com",
        username: "joao123",
      });

      expect(result.statusCode).toBe(400);
      expect(result.body).toHaveProperty("ok", false);
      expect(result.body).toHaveProperty(
        "mensagem",
        "É necessário informar o mínimo de 6 caracteres para password"
      );
    });

    it("Deve retornar 400 quando o e-mail for inválido", async () => {
      const result = await request(server).post("/usuarios").send({
        name: "Joao Da Silva",
        password: "123456",
        email: "teste.com",
        username: "joao123",
      });

      expect(result.statusCode).toBe(400);
      expect(result.body).toHaveProperty("ok", false);
      expect(result.body).toHaveProperty("mensagem", "E-mail inválido");
    });

    it("deve retornar 400 quando houver um usuário cadastrado com o mesmo e-mail", async () => {
      await repository.usuario.create({
        data: {
          email: "email@teste.com",
          name: "Joao teste",
          password: "123456",
          username: "joaoteste",
        },
      });

      const result = await request(server).post("/usuarios").send({
        name: "Fabricio teste",
        email: "email@teste.com",
        username: "joaoteste",
        password: "123333",
      });

      expect(result.statusCode).toBe(400);
      expect(result.body).toHaveProperty("ok", false);
      expect(result.body).toHaveProperty(
        "mensagem",
        "E-mail e/ou username já cadastrado"
      );
    });

    it("Deve retornar 201 quando usuario for cadastrado com sucesso", async () => {
      const result = await request(server).post("/usuarios").send({
        name: "Joao da silva",
        password: "123458",
        username: "joaoteste1",
        email: "joao@teste.com",
      });

      expect(result.statusCode).toBe(201);
      expect(result.body).toHaveProperty("ok", true);
      expect(result.body).toHaveProperty("mensagem", "Usuário cadastrado!");
      expect(result.body.dados).toStrictEqual({
        id: expect.any(String),
        name: "Joao da silva",
        email: "joao@teste.com",
        username: "joaoteste1",
      });
    });
  });
});
