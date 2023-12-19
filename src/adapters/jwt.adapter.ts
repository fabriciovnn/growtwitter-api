import jwt from "jsonwebtoken";

export class JWTAdapter {
  private _secret: string;
  private _expireIn: string;

  constructor(secret: string, expireIn: string) {
    this._secret = secret;
    this._expireIn = expireIn;
  }

  public gerarToken(dado: any): string {
    const token = jwt.sign(dado, this._secret, {
      expiresIn: this._expireIn,
    });
    return token;
  }

  public decodificarToken(token: string): any {
    const dado = jwt.verify(token, this._secret);
    if (!dado) return undefined;

    return dado;
  }
}
