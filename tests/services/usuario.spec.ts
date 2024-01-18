import { Usuario } from "@prisma/client";
import { BcryptAdapter, JWTAdapter } from "../../src/adapters";
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

  describe("Login", () => {
    it("Deve retornar Credenciais inválidas quando não encontrar usuario com o email", async () => {
      const sut = createSut();

      prismaMock.usuario.findUnique.mockResolvedValue({
        email: "any_email",
        name: "any_name",
        username: "any_username",
        password: "any_password",
        imgUrl: "any_imgurl",
      } as Usuario);

      const result = await sut.login({
        email: "any_email2",
        password: "any_password",
      });

      expect(result.code).toBe(401);
      expect(result.ok).toBeFalsy();
      expect(result).toHaveProperty("mensagem", "Credenciais inválidas");
    });

    it("Deve retornar Credenciais inválidas quando o password informado for inválido", async () => {
      prismaMock.usuario.findUnique.mockResolvedValue({
        id: "any_id",
        name: "any_name",
        email: "any_email",
        username: "any_username",
        password: "any_password",
        imgUrl: "any_imgurl",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest
        .spyOn(BcryptAdapter.prototype, "compararHash")
        .mockResolvedValue(false);

      const sut = createSut();
      const result = await sut.login({
        email: "any_email",
        password: "any_password",
      });

      expect(result).toBeTruthy();
      expect(result.ok).toBe(false);
      expect(result.code).toBe(401);
      expect(result.mensagem).toBe("Credenciais inválidas");
    });

    it("Deve retornar um objeto de sucesso quando o password e o email informado for válido", async () => {
      prismaMock.usuario.findUnique.mockResolvedValue({
        id: "any_id",
        name: "any_name",
        email: "any_email",
        username: "any_username",
        password: "any_password",
        imgUrl: "any_imgurl",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest
        .spyOn(BcryptAdapter.prototype, "compararHash")
        .mockResolvedValue(true);
      jest
        .spyOn(JWTAdapter.prototype, "gerarToken")
        .mockReturnValue("any_token");

      const sut = createSut();
      const result = await sut.login({
        email: "any_email",
        password: "any_password",
      });

      expect(result).toBeTruthy();
      expect(result.ok).toBe(true);
      expect(result.code).toBe(200);
      expect(result.mensagem).toBe("Login efetuado");
      expect(result.dados).toBeDefined();
      expect(result.dados).toHaveProperty("token");
      expect(result.dados?.token).toBe("any_token");
      expect(result.dados).toHaveProperty("user");
      expect(result.dados?.user).toBeDefined();
      expect(result.dados?.user).toHaveProperty("id");
    });
  });

  describe("listarPorId", () => {});
});
