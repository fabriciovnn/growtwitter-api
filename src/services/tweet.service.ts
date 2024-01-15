import {
  Retweet as RetweetDB,
  Tweet as TweetDB,
  Usuario as UsuarioDB,
} from "@prisma/client";
import { CadastrarTweetDTO, ResponseDTO } from "../dtos";
import { Retweet, Tweet, Usuario } from "../models";
import repository from "../repositories/prisma.connection";

interface TweetWithRelationsUser extends TweetDB {
  user: UsuarioDB;
  retweets: RetweetDB[];
}

export class TweetService {
  public async cadastrar(dados: CadastrarTweetDTO): Promise<ResponseDTO> {
    const novoTweet = await repository.tweet.create({
      data: {
        content: dados.content,
        type: dados.type,
        userId: dados.userId,
      },
      include: { user: true, retweets: true },
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
      include: { user: true, retweets: true },
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
      include: { user: true, retweets: true },
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

  private mapToModel(tweetDB: TweetWithRelationsUser) {
    const user = new Usuario(
      tweetDB.user.id,
      tweetDB.user.name,
      tweetDB.user.email,
      tweetDB.user.username,
      tweetDB.user.password,
      tweetDB.user.imgUrl || undefined
    );
    const tweet = new Tweet(
      tweetDB.id,
      tweetDB.content,
      tweetDB.type,
      tweetDB.userId
    );

    const retweets: Retweet[] = [];
    tweetDB.retweets.forEach(async (r) => {
      const retweet = new Retweet(r.id, r.content, r.type, r.userId, r.tweetId);

      retweets.unshift(retweet);
    });

    return {
      ...tweet.toJSON(),
      user: user.toJSON(),
      retweets: retweets,
    };
  }
}
