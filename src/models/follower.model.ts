export class Follower {
  constructor(
    private _id: string,
    private _userId: string,
    private _followerId: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this._userId;
  }

  public get followerId(): string {
    return this._followerId;
  }

  public toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      followerId: this._followerId,
    };
  }
}
