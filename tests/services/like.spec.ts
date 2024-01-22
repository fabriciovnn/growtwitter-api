import { Like } from "@prisma/client";
import { LikeService } from "../../src/services";
import { prismaMock } from "../config/prisma.mock";

describe("Testes para o módulo Like", () => {
  const createSut = () => {
    return new LikeService();
  };

  describe("Cadastrar", () => {
    it("Deve retornar Registro de Like Já Existe quando já houver like pelo id de usuario e tweet informado", async () => {
      prismaMock.like.findFirst.mockResolvedValue({} as Like);

      const sut = createSut();
      const result = await sut.cadastrar({
        userId: "any_userid",
        tweetId: "any_tweetid",
      });

      expect(result.code).toBe(400);
      expect(result.ok).toBeFalsy();
      expect(result).toHaveProperty("mensagem", "Registro de Like Já Existe");
    });

    it("Deve retornar dados quando sucesso", async () => {
      prismaMock.like.create.mockResolvedValue({
        id: "any_id",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "any_userid",
        tweetId: "any_tweetid",
        replieId: null,
      });

      const sut = createSut();
      const result = await sut.cadastrar({
        userId: "any_userid",
        tweetId: "any_tweetid",
      });

      expect(result.code).toBe(201);
      expect(result.ok).toBeTruthy();
      expect(result).toHaveProperty("mensagem", "Like cadastrado com sucesso");
      expect(result).toHaveProperty("dados");
      expect(result.dados).toStrictEqual({
        id: "any_id",
        userId: "any_userid",
        tweetId: "any_tweetid",
        replieId: undefined,
      });
    });
  });

  describe("listarPorId", () => {
    it("Deve retornar mensagem de erro quando não houver like pelo id informado", async () => {
      const sut = createSut();

      const result = await sut.listarPorId({
        id: "any_id",
        userId: "any_userid",
      });

      expect(result).toBeDefined();
      expect(result.code).toBe(404);
      expect(result.ok).toBeFalsy();
      expect(result).toHaveProperty(
        "mensagem",
        "Registro de like não encontrado"
      );
    });

    it("Deve retornar objeto de sucesso quando houver like pelo id informado", async () => {
      prismaMock.like.findFirst.mockResolvedValue({} as Like);

      const sut = createSut();
      const result = await sut.listarPorId({
        id: "any_id",
        userId: "any_userid",
      });

      expect(result).toBeDefined();
      expect(result.code).toBe(200);
      expect(result.ok).toBeTruthy();
      expect(result).toHaveProperty(
        "mensagem",
        "Registro de Like encontrado com sucesso"
      );
      expect(result).toHaveProperty("dados");
      expect(result.dados).toHaveProperty("id");
    });
  });

  describe("Deletar", () => {
    it("Deve retornar objeto de sucesso quando houver like pelo id informado", async () => {
      prismaMock.like.delete.mockResolvedValue({
        id: "any_id",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "any_userid",
        tweetId: "any_id",
        replieId: null,
      });

      const sut = createSut();
      const result = await sut.deletar({ id: "any_id", userId: "any_userid" });

      expect(result.code).toBe(200);
      expect(result.ok).toBeTruthy();
      expect(result).toHaveProperty("mensagem", "Like excluido com sucesso");
      expect(result).toHaveProperty("dados");
      expect(result.dados).toHaveProperty("id", "any_id");
    });
  });
});
