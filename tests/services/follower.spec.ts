import { Follower } from "@prisma/client";
import { FollowerService } from "../../src/services";
import { prismaMock } from "../config/prisma.mock";

describe("Testes para o módulo Follower", () => {
  const createSut = () => {
    return new FollowerService();
  };

  describe("Cadastrar", () => {
    it("Deve retornar objeto de erro quando já houver registro de follower", async () => {
      prismaMock.follower.findFirst.mockResolvedValue({} as Follower);

      const sut = createSut();
      const result = await sut.cadastrar({
        followerId: "any_followerid",
        userId: "any_userid",
      });

      expect(result).toBeDefined();
      expect(result.code).toBe(400);
      expect(result.ok).toBeFalsy();
      expect(result).toHaveProperty("mensagem", "Registro de Follow Já Existe");
    });

    it("Deve retornar objeto de sucesso quando não houver follower com este id informado", async () => {
      prismaMock.follower.create.mockResolvedValue({
        id: "any_id",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "any_userid",
        followerId: "any_followerid",
      });

      const sut = createSut();
      const result = await sut.cadastrar({
        followerId: "any_followerid",
        userId: "any_userid",
      });

      expect(result).toBeDefined();
      expect(result.code).toBe(201);
      expect(result.ok).toBeTruthy();
      expect(result).toHaveProperty(
        "mensagem",
        "Follow cadastrado com sucesso"
      );
      expect(result).toHaveProperty("dados");
      expect(result.dados).toHaveProperty("id", "any_id");
    });
  });

  describe("Deletar", () => {
    it("Deve deletar e retornar objeto de sucesso quando houver registro follower pelo id informado", async () => {
      prismaMock.follower.delete.mockResolvedValue({
        id: "any_id",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "any_userid",
        followerId: "any_followerid",
      } as Follower);

      const sut = createSut();
      const result = await sut.deletar({ id: "any_id", userId: "any_userid" });

      expect(result).toBeDefined();
      expect(result.code).toBe(200);
      expect(result.ok).toBeTruthy();
      expect(result).toHaveProperty(
        "mensagem",
        "Follower excluido com sucesso"
      );
      expect(result).toHaveProperty("dados");
      expect(result.dados).toStrictEqual({
        id: "any_id",
        userId: "any_userid",
        followerId: "any_followerid",
      });
    });
  });

  describe("ListarPorId", () => {
    it("deve retornar objeto de erro quando não encontrar registro de follow pelo id informado", async () => {
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
        "Registro de Follower não encontrado"
      );
    });

    it("deve retornar um objeto de sucesso quando encontrar registro de follower pelo id informado", async () => {
      prismaMock.follower.findFirst.mockResolvedValue({
        id: "any_id",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "any_userid",
        followerId: "any_followerid",
      });

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
        "Registro de Follower encontrado com sucesso"
      );
      expect(result).toHaveProperty("dados");
      expect(result.dados).toHaveProperty("id", "any_id");
    });
  });
});
