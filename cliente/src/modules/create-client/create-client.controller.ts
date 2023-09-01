import { Request, Response } from "express";
import { CreateClientUsecase } from "../create-client/create-client.usecase";

export class CreateCustomerController {
  constructor() {}

  async handle(request: Request, resoponse: Response) {
    const useCase = new CreateClientUsecase();
    try {
      const result = await useCase.execute(request.body);
      return resoponse.json(result);
    } catch (err) {
      return resoponse.status(400).json(err);
    }
  }
}
