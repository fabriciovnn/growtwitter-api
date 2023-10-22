
export class Like {
  constructor(
    private _id: string,
    private _userId: string,
    private _tweetId: string
  ) {}
  
  public get id() : string {
    return this._id;
  }

  public get userId() : string {
    return this._userId;
  }

  public get tweetId() : string {
    return this._tweetId;
  }

  public toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      tweetId: this._tweetId
    }
  }
}