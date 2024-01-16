import { Replie as ReplieDB, Tweet as TweetDB } from "@prisma/client";
import { CadastrarReplieDTO, ResponseDTO } from "../dtos";
import { Replie, Tweet } from "../models";
import repository from "../repositories/prisma.connection";

interface ReplieWithRelationTweet extends ReplieDB {
  tweet: TweetDB;
}

export class ReplieService {
  public async cadastrar(dados: CadastrarReplieDTO): Promise<ResponseDTO> {
    const replieExiste = await repository.replie.findFirst({
      where: { AND: [{ userId: dados.userId }, { tweetId: dados.tweetId }] },
    });

    if (replieExiste) {
      return {
        code: 400,
        ok: false,
        mensagem: "Este tweet já foi respondido por este usuário",
      };
    }

    const newReplie = await repository.replie.create({
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
      mensagem: "Replie cadastrado com sucesso",
      dados: this.mapToModel(newReplie),
    };
  }

  private mapToModel(replieDB: ReplieWithRelationTweet) {
    const tweet = new Tweet(
      replieDB.tweet.id,
      replieDB.tweet.content,
      replieDB.tweet.type,
      replieDB.tweet.userId
    );

    const replie = new Replie(
      replieDB.id,
      replieDB.content,
      replieDB.type,
      replieDB.userId,
      replieDB.tweetId
    );

    return { ...replie.toJSON(), tweet: tweet.toJSON() };
  }
}
