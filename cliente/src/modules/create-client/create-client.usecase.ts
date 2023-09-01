import { prismaClient } from "../../infra/database/prismaClient";
import {  kafkaSendMessage } from '../../infra/providers/kafka/producer'

type CreateClientRequest = {
    name: string
    password: string
    email: string
    phone: string
}

export class CreateClientUsecase {
    constructor() {}

    async execute(data: CreateClientRequest) {
        const customer = await  prismaClient.client.findFirst({
            where: {
                email: data.email
            },
        })

        if (customer) throw new Error('Customer already exists!')

        const customerCreated = await prismaClient.client.create({
            data: {
                ...data,
            },
        })

        const kafkaProducer = new kafkaSendMessage()
        await kafkaProducer.execute('CUSTOMER_CREATED', {
            id: customerCreated.id,
            email: customerCreated.email,
        })
          
        return customerCreated
    }
}