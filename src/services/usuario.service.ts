import { CadastrarUsuarioDTO, LogarUsuarioDTO, ResponseDTO } from "../dtos";
import { Usuario } from "../models";
import { Usuario as UsuarioDB} from '@prisma/client'
import repository from "../repositories/prisma.connection";
import { randomUUID } from "crypto";

export class UsuarioService {
  public async cadastrar(dados: CadastrarUsuarioDTO): Promise<ResponseDTO> {
    const emailExiste = await repository.usuario.findUnique({
      where: { email: dados.email }});
    
    if(emailExiste) {
      return {
        code: 400,
        ok: false,
        mensagem: 'E-mail já cadastrado',
      }
    }

    const usernameExiste = await repository.usuario.findUnique({
      where: {username: dados.username}
    })

    if(usernameExiste) {
      return {
        code: 400,
        ok: false,
        mensagem: 'Username já cadastrado'
      };
    }

    const usuarioDB = await repository.usuario.create({
      data: {
        name: dados.name,
        email: dados.email,
        username: dados.username,
        password: dados.password
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: 'Usuário cadastrado!',
      dados: this.mapToModel({...usuarioDB})
    };
  }

  public async login(dados: LogarUsuarioDTO): Promise<ResponseDTO>{
    const usuarioEncontrado = await repository.usuario.findUnique({
      where: {
        email: dados.email,
        password: dados.password,
      }
    });

    if(!usuarioEncontrado) {
      return {
        code: 401,
        ok: false,
        mensagem: 'Credenciais inválidas',
      };
    }

    const token = randomUUID();

    await repository.usuario.update({
      where: { id: usuarioEncontrado.id },
      data: { authToken: token},
    });

    return {
      code: 200,
      ok: true,
      mensagem: 'Login efetuado',
      dados: { token },
    };
  }

  public async validarToken(token: string): Promise<String | null> {
    const usuarioEncontrado = await repository.usuario.findFirst({
      where: { authToken: token}
    })

    if(!usuarioEncontrado) return null;

    return usuarioEncontrado.id;
  }

  private mapToModel(usuarioDB: UsuarioDB): Usuario {
    return new Usuario(
      usuarioDB.id,
      usuarioDB.name,
      usuarioDB.email,
      usuarioDB.username,
      usuarioDB.password
    );
  }
}