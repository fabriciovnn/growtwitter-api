import { Request, Response } from "express";
import { UsuarioService } from "../services";

export class UsuarioController {
  public async create(req: Request, res: Response) {
    const { name, email, username, password} = req.body
    const service = new UsuarioService();

    const emailExiste = await service.verificarEmailExistente(email);
    const usernameExiste = await service.verificarUsernameExistente(username);

    if(emailExiste) {
      return res.status(400).json({
        ok: false,
        mensagem: 'E-mail já cadastrado',
      });
    }

    if(usernameExiste) {
      return res.status(400).json({
        ok: false,
        mensagem: 'Username já existe'
      });
    }

    const novoUsuario = await service.cadastrar({
      name,
      email,
      username,
      password
    });

    return res.status(201).json({
      ok: true,
      mensagem: 'Usuario cadastrado!',
      dados: novoUsuario.toJSON(),
    });
  }
}