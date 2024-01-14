import { CadastrarTweetDTO } from "./cadastrar-tweet.dto";

export interface CadastrarRetweetDTO extends CadastrarTweetDTO {
  tweetId: string;
}
