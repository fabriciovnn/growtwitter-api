import { Usuario as UsuarioDB } from "@prisma/client";
import { randomUUID } from "crypto";
import { CadastrarUsuarioDTO, LogarUsuarioDTO, ResponseDTO } from "../dtos";
import { Usuario } from "../models";
import repository from "../repositories/prisma.connection";

export class UsuarioService {
  public async cadastrar(dados: CadastrarUsuarioDTO): Promise<ResponseDTO> {
    const usuarioExiste = await repository.usuario.findFirst({
      where: { OR: [{ email: dados.email }, { username: dados.username }] },
    });

    if (usuarioExiste) {
      return {
        code: 400,
        ok: false,
        mensagem: "E-mail e/ou username já cadastrado",
      };
    }

    const usuarioDB = await repository.usuario.create({
      data: {
        name: dados.name,
        email: dados.email,
        username: dados.username,
        password: dados.password,
        imgUrl: dados.imgUrl,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Usuário cadastrado!",
      dados: this.mapToModel(usuarioDB),
    };
  }

  public async login(dados: LogarUsuarioDTO): Promise<ResponseDTO> {
    const usuarioEncontrado = await repository.usuario.findFirst({
      where: { AND: [{ email: dados.email }, { password: dados.password }] },
    });

    if (!usuarioEncontrado) {
      return {
        code: 401,
        ok: false,
        mensagem: "Credenciais inválidas",
      };
    }

    const token = randomUUID();

    await repository.usuario.update({
      where: { id: usuarioEncontrado.id },
      data: { authToken: token },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Login efetuado",
      dados: { token, user: this.mapToModel(usuarioEncontrado) },
    };
  }

  private mapToModel(usuarioDB: UsuarioDB): Usuario {
    return new Usuario(
      usuarioDB.id,
      usuarioDB.name,
      usuarioDB.email,
      usuarioDB.username,
      usuarioDB.password,
      usuarioDB.imgUrl || undefined
    );
  }
}
