import jwt from "jsonwebtoken";
import { JWTAdapter } from "../../src/adapters";
import { envs } from "../../src/envs";

describe("Teste unitários para o adapter JWTAdapter", () => {
  function createSut() {
    return new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
  }

  test("Deve retornar um token quando chamado o metodo gerarToken enviando um objeto qualquer", () => {
    const mockJWT = jest.fn().mockReturnValue("any_token");
    (jwt.sign as jest.Mock) = mockJWT;

    const sut = createSut();

    const token = sut.gerarToken({
      anyProperty: "any_value",
    });

    expect(token).toBe("any_token");
  });

  test("Deve retornar um objeto qualquer quando chamado o metodo decodificarToken enviando um token válido", () => {
    const mockJWT = jest.fn().mockReturnValue({
      anyProperty: "any_value",
    });
    (jwt.verify as jest.Mock) = mockJWT;

    const sut = createSut();

    const resultado = sut.decodificarToken("any_token");

    expect(resultado).toHaveProperty("anyProperty");
    expect(resultado.anyProperty).toBeDefined();
    expect(resultado.anyProperty).toBe("any_value");
  });

  test("Deve retornar undefined quando chamado o metodo decodificarToken enviando um token inválido", () => {
    const mockJWT = jest.fn().mockReturnValue(undefined);
    (jwt.verify as jest.Mock) = mockJWT;

    const sut = createSut();

    const resultado = sut.decodificarToken("any_token_inválido");

    expect(resultado).toBeUndefined();
    expect(resultado).toBeFalsy();
  });
});
