import { CadastrarUsuarioDTO } from "../dtos";
import { Usuario } from "../models";
import { Usuario as UsuarioDB} from '@prisma/client'
import repository from "../repositories/prisma.connection";

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
    const alunoDB = await repository.usuario.create({
      data: {
        name: dados.name,
        email: dados.email,
        username: dados.username,
        password: dados.password
      },
    });

    return this.mapToModel({...alunoDB});
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