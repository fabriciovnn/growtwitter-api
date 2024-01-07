import { Usuario as UsuarioDB } from "@prisma/client";
import { BcryptAdapter, JWTAdapter } from "../adapters";
import { CadastrarUsuarioDTO, LogarUsuarioDTO, ResponseDTO } from "../dtos";
import { envs } from "../envs";
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

    const bcrypt = new BcryptAdapter(Number(envs.BCRYPT_SALT));
    const hash = await bcrypt.gerarHash(dados.password);

    const usuarioDB = await repository.usuario.create({
      data: {
        name: dados.name,
        email: dados.email,
        username: dados.username,
        password: hash,
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
      where: { email: dados.email },
    });

    if (!usuarioEncontrado) {
      return {
        code: 401,
        ok: false,
        mensagem: "Credenciais inválidas",
      };
    }

    const bcrypt = new BcryptAdapter(Number(envs.BCRYPT_SALT));
    const corresponde = await bcrypt.compararHash(
      dados.password,
      usuarioEncontrado.password
    );

    if (!corresponde) {
      return {
        code: 401,
        ok: false,
        mensagem: "Credenciais inválidas",
      };
    }

    const usuarioModel = this.mapToModel(usuarioEncontrado);
    const jwt = new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
    const token = jwt.gerarToken(usuarioModel.toJSON());

    return {
      code: 200,
      ok: true,
      mensagem: "Login efetuado",
      dados: { token, user: usuarioModel },
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
