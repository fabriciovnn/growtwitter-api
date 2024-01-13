import { Tweet as TweetDB, Usuario as UsuarioDB } from "@prisma/client";
import { CadastrarTweetDTO, ResponseDTO } from "../dtos";
import { Tweet, Usuario } from "../models";
import repository from "../repositories/prisma.connection";

interface TweetWithRelationsUser extends TweetDB {
  user: UsuarioDB;
}

export class TweetService {
  public async cadastrar(dados: CadastrarTweetDTO): Promise<ResponseDTO> {
    const novoTweet = await repository.tweet.create({
      data: {
        content: dados.content,
        type: dados.type,
        userId: dados.userId,
      },
      include: { user: true },
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
      include: { user: true },
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

  public async listarPorId(idTweet: string): Promise<ResponseDTO> {
    const tweetEncontrado = await repository.tweet.findFirst({
      where: { id: idTweet },
      include: { user: true },
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
    return { ...tweet.toJSON(), user: user.toJSON() };
  }
}
