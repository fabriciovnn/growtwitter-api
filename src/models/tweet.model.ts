export class Tweet {
  constructor(
    private _id: string,
    private _content: string,
    private _type: string,
    private _userId: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get content(): string {
    return this._content;
  }

  public get type(): string {
    return this._type;
  }

  public get userId(): string {
    return this._userId;
  }

  public toJSON() {
    return {
      id: this._id,
      content: this._content,
      type: this._type,
      userId: this._userId,
    };
  }
}
