
type tipoTweet = 'T' | 'R'

export interface CadastrarTweetDTO {
  content: string;
  type: tipoTweet;
  userId: string;
}