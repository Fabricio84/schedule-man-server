import { Request, Response } from "express";
import { prisma } from "../prisma";

class BlockedDatesController {
  async index(request: Request, response: Response) {
    const models = await prisma.blockedDate.findMany();

    return response.json(models);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const model = await prisma.blockedDate.findFirst({ where: { id } });

    return response.json(model);
  }

  async create(request: Request, response: Response) {
    const { start, end } = request.body;
    const data = { start, end };

    await prisma.blockedDate.create({ data });

    return response.status(201).send();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.blockedDate.update({
      where: { id },
      data: { ...request.body },
    });

    return response.status(204).send();
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.blockedDate.delete({ where: { id } });

    return response.status(204).send();
  }
}

export default BlockedDatesController;
