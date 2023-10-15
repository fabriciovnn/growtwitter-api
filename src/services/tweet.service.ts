import { CadastrarTweetDTO } from "../dtos/cadastrar-tweet.dto";
import { Tweet } from "../models";
import {Tweet as TweetDB} from '@prisma/client'
import repository from "../repositories/prisma.connection";

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

  private mapToModel(tweetDB: TweetDB): Tweet{
    return new Tweet(
      tweetDB.id,
      tweetDB.content,
      tweetDB.type,
      tweetDB.userId
    )
  }
}