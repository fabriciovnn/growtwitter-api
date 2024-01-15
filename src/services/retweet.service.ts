import { Retweet as RetweetDB, Tweet as TweetDB } from "@prisma/client";
import { CadastrarRetweetDTO, ResponseDTO } from "../dtos";
import { Retweet, Tweet } from "../models";
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
        type: dados.type,
        userId: dados.userId,
        tweetId: dados.tweetId,
      },
      include: { tweet: true },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Retweet cadastrado com sucesso",
      dados: this.mapToModel(newRetweet),
    };
  }

  private mapToModel(retweetDB: RetweetWithRelationTweet) {
    const tweet = new Tweet(
      retweetDB.tweet.id,
      retweetDB.tweet.content,
      retweetDB.tweet.type,
      retweetDB.tweet.userId
    );

    const retweet = new Retweet(
      retweetDB.id,
      retweetDB.content,
      retweetDB.type,
      retweetDB.userId,
      retweetDB.tweetId
    );

    return { ...retweet.toJSON(), tweet: tweet.toJSON() };
  }
}
