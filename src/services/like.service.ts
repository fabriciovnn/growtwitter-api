import { Like as LikeDB } from "@prisma/client";
import { CadastrarLikeDTO } from "../dtos";
import repository from "../repositories/prisma.connection";
import { Like } from "../models";

export class LikeService {
  public async cadastrar(dados: CadastrarLikeDTO): Promise<Like> {
    const likeDB = await repository.like.create({
      data: {
        tweetId: dados.tweetId,
        userId: dados.userId
      }
    })

    return this.mapToModel({...likeDB})
  }

  private mapToModel(likeDB: LikeDB): Like{
    return new Like(
      likeDB.id,
      likeDB.tweetId,
      likeDB.userId
    )
  }
}