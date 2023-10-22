import { Like } from "./like.model";
import { Tweet } from "./tweet.model";

export class Usuario {
  private _tweets: Tweet[];
  private _likes: Like[];
  
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _username: string,
    private _password: string,
  ) {
    this._tweets = []
    this._likes = []
  }

  public get id() : string {
    return this._id;
  }

  public get name() : string {
    return this._name;
  }

  public get email() : string {
    return this._email;
  }

  public get username() : string {
    return this._username;
  }
  
  public get password() : string {
    return this._password;
  }
  
  public get tweets() : Tweet[] {
    return this._tweets
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