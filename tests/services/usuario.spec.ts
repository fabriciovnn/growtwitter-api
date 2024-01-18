import { Usuario } from "@prisma/client";
import { CadastrarUsuarioDTO } from "../../src/dtos/cadastrar-usuario.dto";
import { UsuarioService } from "../../src/services/usuario.service";
import { prismaMock } from "../config/prisma.mock";

describe("Testes para o módulo Usuário", () => {
  const createSut = () => {
    return new UsuarioService();
  };

  describe("Cadastrar", () => {
    const createUsuarioDTO: CadastrarUsuarioDTO = {
      email: "any_email",
      name: "any_name",
      username: "any_username",
      password: "any_password",
      imgUrl: "any_imgurl",
    };

    it("deve retornar E-mail e/ou username já cadastrado quando já existir um usuario com esse email ou username", async () => {
      const sut = createSut();

      prismaMock.usuario.findFirst.mockResolvedValue({} as Usuario);
      const result = await sut.cadastrar(createUsuarioDTO);

      expect(result.code).toBe(400);
      expect(result.ok).toBeFalsy();
      expect(result).toHaveProperty(
        "mensagem",
        "E-mail e/ou username já cadastrado"
      );
    });

    it("deve retornar Usuário cadastrado! quando sucesso", async () => {
      const sut = createSut();

      prismaMock.usuario.findFirst.mockResolvedValue(null);
      prismaMock.usuario.create.mockResolvedValue({
        id: "any_id",
        name: "any_name",
        email: "any_email",
        username: "any_username",
        password: "any_password",
        imgUrl: "any_imgurl",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await sut.cadastrar(createUsuarioDTO);

      expect(result.code).toBe(201);
      expect(result.ok).toBeTruthy();
      expect(result).toHaveProperty("mensagem", "Usuário cadastrado!");
      expect(result.dados).toStrictEqual({
        id: "any_id",
        name: "any_name",
        email: "any_email",
        username: "any_username",
        imgUrl: "any_imgurl",
      });
    });
  });

  describe("Login", () => {});

  describe("listarPorId", () => {});
});
