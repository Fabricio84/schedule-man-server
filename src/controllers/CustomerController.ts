import { Request, Response } from 'express';
import { prisma } from "../prisma";

class CustomerController {
  async index(request: Request, response: Response) {
    const models = await prisma.customer.findMany();

    return response.json(models)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const model = await prisma.customer.findFirst({ where: { id }})

    return response.json(model)
  }

  async create(request: Request, response: Response) {
    const { name, phone, email, password } = request.body

    const user = await prisma.user.create({ data: { email, password } })
    await prisma.customer.create({ data: { name, phone, userID: user.id } })

    return response.status(201).send();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.customer.update({
      where: { id },
      data: { ...request.body }
    })

    return response.status(204).send();
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.customer.delete({ where: { id }})

    return response.status(204).send();
  }
}

export default CustomerController;