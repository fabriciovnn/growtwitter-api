import { Replie as ReplieDB, Tweet as TweetDB } from "@prisma/client";
import { CadastrarTweetDTO, ResponseDTO } from "../dtos";
import { Replie, Tweet } from "../models";
import repository from "../repositories/prisma.connection";

interface TweetWithRelationReplies extends TweetDB {
  replies: ReplieDB[];
}

export class TweetService {
  public async cadastrar(dados: CadastrarTweetDTO): Promise<ResponseDTO> {
    const novoTweet = await repository.tweet.create({
      data: {
        content: dados.content,
        type: dados.type,
        userId: dados.userId,
      },
      include: { user: true, replies: true },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Tweet cadastrado com sucesso",
      dados: this.mapToModel(novoTweet),
    };
  }

  public async listarTodos(userId: string | undefined): Promise<ResponseDTO> {
    const tweets = await repository.tweet.findMany({
      where: { userId: userId },
      include: { user: true, replies: true },
    });

    if (!tweets.length) {
      return {
        code: 404,
        ok: false,
        mensagem: "Não foram encontrados tweets",
      };
    }

    const tweetsComLikes = [];
    for (const tweet of tweets) {
      let like;
      const totalLikes = await repository.like.count({
        where: { tweetId: tweet.id },
      });

      if (userId) {
        like = await repository.like.findFirst({
          where: { AND: [{ userId: userId }, { tweetId: tweet.id }] },
        });
      }

      const tweetComCount = { ...tweet, totalLikes, like: !!like };
      tweetsComLikes.push(tweetComCount);
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Tweets listados com sucesso",
      dados: tweetsComLikes.map((item) => {
        return {
          ...this.mapToModel(item),
          totalLikes: item.totalLikes,
          like: item.like,
        };
      }),
    };
  }

  public async listarPorId(tweetId: string): Promise<ResponseDTO> {
    const tweetEncontrado = await repository.tweet.findFirst({
      where: { id: tweetId },
      include: { replies: true },
    });

    if (!tweetEncontrado) {
      return {
        code: 404,
        ok: false,
        mensagem: "Tweet não encontrado",
      };
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Tweet encontrado com sucesso",
      dados: this.mapToModel(tweetEncontrado),
    };
  }

  private mapToModel(tweetDB: TweetWithRelationReplies) {
    const tweet = new Tweet(
      tweetDB.id,
      tweetDB.content,
      tweetDB.type,
      tweetDB.userId
    );

    const replies: Replie[] = [];
    tweetDB.replies.forEach(async (r) => {
      const replie = new Replie(r.id, r.content, r.type, r.userId, r.tweetId);

      replies.unshift(replie);
    });

    return {
      ...tweet.toJSON(),
      replies: replies,
    };
  }
}
