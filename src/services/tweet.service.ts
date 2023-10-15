
import { Tweet } from "../models";
import {Tweet as TweetDB} from '@prisma/client'
import repository from "../repositories/prisma.connection";
import { CadastrarTweetDTO } from "../dtos";

export class TweetService {

  public async cadastrar(dados: CadastrarTweetDTO): Promise<Tweet> {
    const tweetDB = await repository.tweet.create({
      data: {
        content: dados.content,
        type: dados.type,
        userId: dados.userId
      }
    })

    return this.mapToModel({...tweetDB})
  }

  public async verificarTweetExistente(id: string): Promise<boolean>{
    const tweetExiste = await repository.tweet.findUnique({
      where: {id}
    });

    return !!tweetExiste
  }

  private mapToModel(tweetDB: TweetDB): Tweet{
    return new Tweet(
      tweetDB.id,
      tweetDB.content,
      tweetDB.type,
      tweetDB.userId
    )
  }
}