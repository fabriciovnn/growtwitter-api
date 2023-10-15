import { Like } from "./like.model";
import { Tweet } from "./tweet.model";

export class Usuario {
  private _seguidores: Usuario[];
  private _tweets: Tweet[];
  private _retweets: Tweet[];
  private _likes: Like[];
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _username: string,
    private _password: string,
  ) {
    this._seguidores = []
    this._tweets = []
    this._retweets = []
    this._likes = []
  }

  public get seguidores() : Usuario[] {
    return this._seguidores
  }
  
  public get tweets() : Tweet[] {
    return this._tweets
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
      name: this._name,
      email: this._email,
      username: this._username
    }
  }
  
}