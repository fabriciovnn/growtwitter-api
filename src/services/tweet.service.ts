import { Tweet } from "../models";
import { Tweet as TweetDB } from "@prisma/client";
import repository from "../repositories/prisma.connection";
import { CadastrarTweetDTO, ResponseDTO } from "../dtos";

export class TweetService {
  public async cadastrar(dados: CadastrarTweetDTO): Promise<ResponseDTO> {
    const novoTweet = await repository.tweet.create({
      data: {
        content: dados.content,
        type: dados.type,
        userId: dados.userId,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Tweet cadastrado com sucesso",
      dados: this.mapToModel(novoTweet),
    };
  }

  public async listarTodos(user: string | undefined): Promise<ResponseDTO> {
    const tweets = await repository.tweet.findMany({
      where: { userId: user },
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
      const totalLikes = await repository.like.count({
        where: { tweetId: tweet.id },
      });
      const tweetComCount = { ...tweet, totalLikes };
      tweetsComLikes.push(tweetComCount);
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Tweets listados com sucesso",
      dados: tweetsComLikes,
    };
  }

  public async listarPorId(id: string): Promise<ResponseDTO> {
    const tweetEncontrado = await repository.tweet.findFirst({
      where: { id },
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

  private mapToModel(tweetDB: TweetDB): Tweet {
    return new Tweet(tweetDB.id, tweetDB.content, tweetDB.type, tweetDB.userId);
  }
}
