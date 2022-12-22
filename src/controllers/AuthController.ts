import { Request, Response } from 'express';
import { prisma } from "../prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 8;

class AuthController {
  async register(request: Request, response: Response) {
    const { email, password: passwordRaw } = request.body;
    const password = await bcrypt.hash(passwordRaw, saltRounds);
    const data = { email, password }

    await prisma.user.create({ data })

    return response.status(201).send();
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await prisma.user.findFirst({ where: { email }});

    if (!user) 
      return response.status(401).json({ message: 'Email não existe na nossa base de dados!'});

    const isMatch = bcrypt.compareSync(password, user?.password);

    if (!isMatch)
      return response.status(401).json({ message: 'Email ou Senha incorretos!'});
    
    const accessToken = jwt.sign({ email: user.email }, String(process.env.JWT_SECRET));

    response.json({ accessToken });
  }

  // implementar recuperação de senha por meio de link via emails
  async changePassword(request: any, response: Response) {
    // Read username and password from request body
    const { password, newPassword } = request.body;
    const { email }  = request.user;

    const user = await prisma.user.findFirst({
      where: {
        email,
        password
      },
    })

    if (!user) {
      return response.status(401).json({ message: 'Ops não foi possivel trocar sua senha, senha atual invalida!'});
    }

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: newPassword }
      })
    } catch (error) {
      return response.status(401).json({ message: 'Ops não foi possivel trocar sua senha, por favor tente mais tarde!'});
    }

    return response.status(204).send();
  }
}

export default AuthController;