import { CadastrarTweetDTO } from "../../src/dtos";
import { TweetService } from "../../src/services";
import { prismaMock } from "../config/prisma.mock";

describe("Testes para o módulo Tweet", () => {
  const createSut = () => {
    return new TweetService();
  };

  describe("Cadastrar", () => {
    const createTweetDTO: CadastrarTweetDTO = {
      userId: "any_user_id",
      content: "any_content",
      type: "T",
    };

    it("deve retornar Tweet cadastrado quando sucesso", async () => {
      const sut = createSut();

      prismaMock.tweet.create.mockResolvedValue({
        id: "any_id",
        content: "any_content",
        type: "T",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "any_user_id",
      });

      const result = await sut.cadastrar(createTweetDTO);

      expect(result.code).toBe(201);
      expect(result.ok).toBeTruthy();
      expect(result).toHaveProperty("mensagem", "Tweet cadastrado com sucesso");
      expect(result).toHaveProperty("dados");
      expect(result.dados).toHaveProperty("id");
      expect(result.dados.id).toBe("any_id");
      expect(result.dados).toHaveProperty("replies");
      expect(result.dados.replies).toStrictEqual([]);
      expect(result.dados).toHaveProperty("userId", "any_user_id");
    });
  });

  describe("Listar Todos", () => {
    it("Deve retornar objeto de erro quando não encontrar nenhum tweet cadastrado", async () => {
      const sut = createSut();

      const result = await sut.listarTodos("any_id");

      expect(result.code).toBe(404);
      expect(result.ok).toBeFalsy();
      expect(result).toHaveProperty("mensagem", "Não foram encontrados tweets");
    });

    it("deve retornar um objeto de sucesso quando houver tweets cadastrados", async () => {
      prismaMock.tweet.findMany.mockResolvedValue([
        {
          id: "any_id",
          content: "any_content",
          type: "T",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: "any_user_id",
        },
      ]);

      const sut = createSut();
      const result = await sut.listarTodos("any_user_id");

      expect(result.code).toBe(200);
      expect(result.ok).toBeTruthy();
      expect(result).toHaveProperty("mensagem", "Tweets listados com sucesso");
      expect(result).toHaveProperty("dados");
      expect(result.dados).toStrictEqual([
        {
          content: "any_content",
          id: "any_id",
          like: false,
          replies: [],
          totalLikes: undefined,
          type: "T",
          userId: "any_user_id",
        },
      ]);
    });
  });

  describe("Listar por Id", () => {
    it("Deve retornar Tweet não encontrado quando não houver tweet pelo id informado", async () => {
      const sut = createSut();

      const result = await sut.listarPorId("any_id");

      expect(result.code).toBe(404);
      expect(result.ok).toBeFalsy();
      expect(result).toHaveProperty("mensagem", "Tweet não encontrado");
    });

    it("Deve retornar um objeto de sucesso quando informado um id de um tweet cadastrado", async () => {
      prismaMock.tweet.findUnique.mockResolvedValue({
        id: "any_id",
        content: "any_content",
        type: "T",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "any_user_id",
      });

      const sut = createSut();
      const result = await sut.listarPorId("any_id");

      expect(result.code).toBe(200);
      expect(result.code).toBeTruthy();
      expect(result).toHaveProperty("mensagem", "Tweet encontrado com sucesso");
      expect(result).toHaveProperty("dados");
      expect(result.dados).toStrictEqual({
        id: "any_id",
        content: "any_content",
        type: "T",
        userId: "any_user_id",
        replies: [],
      });
    });
  });
});
