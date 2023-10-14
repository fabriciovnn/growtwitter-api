import { CadastrarTweetDTO } from "../dtos/cadastrar-tweet.dto";

export class TweetService {
  public async cadastrar(dados: CadastrarTweetDTO): Promise{
    // Aqui deve ser passado o token do usuario para ser validado antes de criar um tweet
  }
}