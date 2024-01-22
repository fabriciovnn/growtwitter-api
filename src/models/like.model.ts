export class Like {
  constructor(
    private _id: string,
    private _userId: string,
    private _tweetId?: string,
    private _replieId?: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this._userId;
  }

  public get tweetId(): string | undefined {
    return this._tweetId;
  }

  public get replieId(): string | undefined {
    return this._replieId;
  }

  public toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      tweetId: this._tweetId,
      replieId: this._replieId,
    };
  }
}
