import { Retweet as RetweetDB, Tweet as TweetDB } from "@prisma/client";
import { CadastrarRetweetDTO, ResponseDTO } from "../dtos";
import repository from "../repositories/prisma.connection";

interface RetweetWithRelationTweet extends RetweetDB {
  tweet: TweetDB;
}

export class RetweetService {
  public async cadastrar(dados: CadastrarRetweetDTO): Promise<ResponseDTO> {
    const retweetExist = await repository.retweet.findFirst({
      where: { AND: [{ userId: dados.userId }, { tweetId: dados.tweetId }] },
    });

    if (retweetExist) {
      return {
        code: 400,
        ok: false,
        mensagem: "Este tweet já foi retweetado por este usuário",
      };
    }

    const newRetweet = await repository.retweet.create({
      data: {
        content: dados.content,
        type: dados.tweetId,
        userId: dados.userId,
        tweetId: dados.tweetId,
      },
      include: { tweet: true },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Retweet cadastrado com sucesso",
      dados: "",
    };
  }

  private mapToModel(retweetDB: RetweetWithRelationTweet) {
    //models
  }
}
