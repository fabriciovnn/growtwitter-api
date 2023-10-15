
export class Like {
  constructor(
    private _id: string,
    private _userId: string,
    private _tweetId: string,
  ) {}

  public toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      tweetId: this._tweetId
    }
  }
    
}