import { CadastrarUsuarioDTO, LogarUsuarioDTO } from "../dtos";
import { Usuario } from "../models";
import { Usuario as UsuarioDB} from '@prisma/client'
import repository from "../repositories/prisma.connection";
import { randomUUID } from "crypto";

export class UsuarioService {
  public async verificarEmailExistente(email: string): Promise<boolean> {
    const usuarioExiste = await repository.usuario.findUnique({
      where: { email }, 
    });

    return !!usuarioExiste;
  }

  public async verificarUsernameExistente(username: string): Promise<boolean> {
    const usuarioExiste = await repository.usuario.findUnique({
      where: { username },
    });

    return !!usuarioExiste;
  }

  public async cadastrar(dados: CadastrarUsuarioDTO): Promise<Usuario> {
    const usuarioDB = await repository.usuario.create({
      data: {
        name: dados.name,
        email: dados.email,
        username: dados.username,
        password: dados.password
      },
    });

    return this.mapToModel({...usuarioDB});
  }

  public async login(dados: LogarUsuarioDTO): Promise<string | null>{
    const alunoEncontrado = await repository.usuario.findUnique({
      where: {
        username: dados.username,
        password: dados.password
      }
    });


    if(!alunoEncontrado) return null

    const token = randomUUID();

    await repository.usuario.update({
      where: {
        id: alunoEncontrado.id
      },
      data: { authToken: token}
    });

    return token;
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