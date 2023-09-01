import { Request, Response } from 'express'
import { CreateOrderUsecase } from './create-order.usecase'

export class CreateOrderController {
    constructor() {}

    async handle(request: Request, resoponse: Response) {
      const useCase = new CreateOrderUsecase()
      const order = await useCase.execute(request.body)
      return resoponse.json(order)
    }
}