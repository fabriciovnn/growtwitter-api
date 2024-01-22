import { Like as LikeDB } from "@prisma/client";
import { CadastrarLikeDTO, DeletarLikeDTO, ResponseDTO } from "../dtos";
import { Like } from "../models";
import repository from "../repositories/prisma.connection";

export class LikeService {
  public async cadastrar(dados: CadastrarLikeDTO): Promise<ResponseDTO> {
    const likeExiste = await repository.like.findFirst({
      where: {
        userId: dados.userId,
        tweetId: dados.tweetId,
      },
    });

    if (likeExiste) {
      return {
        code: 400,
        ok: false,
        mensagem: "Registro de Like Já Existe",
      };
    }

    const novoLike = await repository.like.create({
      data: {
        userId: dados.userId,
        tweetId: dados.tweetId,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Like cadastrado com sucesso",
      dados: this.mapToModel(novoLike).toJSON(),
    };
  }

  public async listarPorId(dados: DeletarLikeDTO): Promise<ResponseDTO> {
    const likeEncontrado = await repository.like.findFirst({
      where: { id: dados.id, userId: dados.userId },
    });

    if (!likeEncontrado) {
      return {
        code: 404,
        ok: false,
        mensagem: "Registro de like não encontrado",
      };
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Registro de Like encontrado com sucesso",
      dados: this.mapToModel(likeEncontrado),
    };
  }

  public async deletar(dados: DeletarLikeDTO): Promise<ResponseDTO> {
    const likeExcluido = await repository.like.delete({
      where: {
        id: dados.id,
        userId: dados.userId,
      },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Like excluido com sucesso",
      dados: this.mapToModel(likeExcluido).toJSON(),
    };
  }

  private mapToModel(like: LikeDB): Like {
    return new Like(
      like.id,
      like.userId,
      like.tweetId ?? undefined,
      like.replieId ?? undefined
    );
  }
}
