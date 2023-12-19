declare namespace Express {
  interface Request {
    usuario: {
      id: string;
      name: string;
      email: string;
      username: string;
      password: string;
      imgUrl: string;
    };
  }
}
