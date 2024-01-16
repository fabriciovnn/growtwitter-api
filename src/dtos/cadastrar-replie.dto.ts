import { CadastrarTweetDTO } from "./cadastrar-tweet.dto";

export interface CadastrarReplieDTO extends CadastrarTweetDTO {
  tweetId: string;
}
