import { Like } from "./like.model";

export class Tweet {
  private _retweets: Tweet[]
  private _likes: Like[]
  constructor(
    private _id: string,
    private _content: string,
    private _type: string,
    private _userId: string,
  ) {
    this._retweets = []
    this._likes = []
  }

  public get retweets() : Tweet[] {
    return this._retweets
  }
  
  public get likes() : Like[] {
    return this._likes
  }
  

  public toJSON() {
    return {
      id: this._id,
      content: this._content,
      type: this._type,
      userId: this._userId
    }
  }
  
}