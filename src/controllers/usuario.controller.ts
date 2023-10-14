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

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const service = new UsuarioService();

    const token = await service.login({ username, password})

    if(!token) {
      res.status(401).json({
        ok: false,
        mensagem: 'Credenciais inválidas'
      })
    }

    return res.status(200).json({
      ok: true,
      mensagem: 'Login efetuado',
      dados: {
        token: token
      }
    })
  }
}