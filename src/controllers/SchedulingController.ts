import { Request, Response } from 'express';
import { prisma } from "../prisma";

class SchedulingController {
  async index(request: Request, response: Response) {
    const models = await prisma.schedules.findMany();

    return response.json(models)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const model = await prisma.schedules.findFirst({ where: { id }})

    return response.json(model)
  }

  async create(request: Request, response: Response) {
    const { start, end, serviceTypeID, customerID } = request.body
    const data = { start, end, serviceTypeID, customerID }

    await prisma.schedules.create({ data })

    return response.status(201).send();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.schedules.update({
      where: { id },
      data: { ...request.body }
    })

    return response.status(204).send();
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.schedules.delete({ where: { id }})

    return response.status(204).send();
  }
}

export default SchedulingController;