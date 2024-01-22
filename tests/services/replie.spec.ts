import { ReplieService } from "../../src/services";
import { prismaMock } from "../config/prisma.mock";

describe("Testes para o módulo Replie", () => {
  const createSut = () => {
    return new ReplieService();
  };

  describe("Cadastrar", () => {
    it("Deve retornar objeto de erro quando já houver um replie pelo usuario informado pelo id", async () => {
      prismaMock.replie.findFirst.mockResolvedValue({
        id: "any_id",
        content: "any_content",
        type: "R",
        createdAt: new Date(),
        updatedAt: new Date(),
        tweetId: "any_tweetid",
        userId: "any_userid",
      });

      const sut = createSut();

      const result = await sut.cadastrar({
        content: "any_content",
        type: "R",
        tweetId: "any_tweetid",
        userId: "any_userid",
      });

      expect(result).toBeDefined();
      expect(result.code).toBe(400);
      expect(result.ok).toBeFalsy();
      expect(result).toHaveProperty(
        "mensagem",
        "Este tweet já foi respondido por este usuário"
      );
    });
  });
});
