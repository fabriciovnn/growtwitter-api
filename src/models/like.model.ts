export class Like {
  constructor(
    private _id: string,
    private _userId: string,
    private _tweetId?: string,
    private _replietId?: string
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
    return this._replietId;
  }

  public toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      tweetId: this._tweetId,
      replieId: this.replieId,
    };
  }
}
