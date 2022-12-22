import { prisma } from "../prisma";
import { Request, Response } from 'express';

class ServiceTypeController {
  async index(req: Request, res: Response) {

    const services = await prisma.serviceType.findMany();

    return res.json(services)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const model = await prisma.serviceType.findFirst({ where: { id }})

    return response.json(model)
  }

  async create(request: Request, response: Response) {

    const { description, value, duration } = request.body
    const data = { description, value, duration }
    
    await prisma.serviceType.create({ data });

    return response.status(201).end();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.serviceType.update({
      where: { id },
      data: { ...request.body }
    })

    return response.status(204).send();
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.serviceType.delete({ where: { id }})

    return response.status(204).send();
  }
}

export default ServiceTypeController;