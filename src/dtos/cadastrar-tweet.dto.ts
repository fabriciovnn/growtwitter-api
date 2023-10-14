type TypeTweet = 'Tweet' | 'Retweet'

export interface CadastrarTweetDTO {
  content: string;
  type: TypeTweet;
  userId: string;
}