
export class Like {
  constructor(
    private _id: string,
    private _tweetId: string,
    private _userId: string,
  ) {}

  public toJSON() {
    return {
      id: this._id,
      tweetId: this._tweetId,
      userId: this._userId
    }
  }
    
}