import { Follower as FollowerDB } from "@prisma/client";
import { ResponseDTO } from "../dtos";
import { CadastrarFollowerDTO } from "../dtos/cadastrar-follower.dto";

import { DeletarFollowerDTO } from "../dtos/deletar-follower.dto";
import { Follower } from "../models";
import repository from "../repositories/prisma.connection";

export class FollowerService {
  public async cadastrar(dados: CadastrarFollowerDTO): Promise<ResponseDTO> {
    const followExiste = await repository.follower.findFirst({
      where: {
        userId: dados.userId,
        followerId: dados.followerId,
      },
    });

    if (followExiste) {
      return {
        code: 400,
        ok: false,
        mensagem: "Registro de Follow Já Existe",
      };
    }

    const novoFollow = await repository.follower.create({
      data: {
        userId: dados.userId,
        followerId: dados.followerId,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Follow cadastrado com sucesso",
      dados: this.mapToModel(novoFollow),
    };
  }

  public async deletar(dados: DeletarFollowerDTO): Promise<ResponseDTO> {
    const followerExcluido = await repository.follower.delete({
      where: {
        id: dados.id,
        userId: dados.userId,
      },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Like excluido com sucesso",
      dados: this.mapToModel(followerExcluido),
    };
  }

  public async listarPorId(dados: DeletarFollowerDTO): Promise<ResponseDTO> {
    const followerEncontrado = await repository.follower.findFirst({
      where: { id: dados.id, userId: dados.userId },
    });

    if (!followerEncontrado) {
      return {
        code: 404,
        ok: false,
        mensagem: "Registro de Follower não encontrado",
      };
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Registro de Follower encontrado com sucesso",
      dados: this.mapToModel(followerEncontrado),
    };
  }

  private mapToModel(follower: FollowerDB): Follower {
    return new Follower(follower.id, follower.userId, follower.followerId);
  }
}
