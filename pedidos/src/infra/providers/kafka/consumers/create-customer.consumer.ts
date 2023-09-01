import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
    email: string,
    id: string
}

export async function createCustomerConsumer() {
    console.log('CUSTOMER CONSUMER')
    const consumer = await kafkaConsumer('CUSTOMER_CREATED')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageToString = message.value!.toString()
            console.log(messageToString)
            const custmer = JSON.parse(messageToString) as CustomerConsumer;

            await prismaClient.customer.create({
                data: {
                    externalId: custmer.id,
                    email: custmer.email,
                }
            })
        },
    })
}

createCustomerConsumer()