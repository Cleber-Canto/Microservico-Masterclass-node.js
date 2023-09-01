import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumer";

type CustomerConsumer = {
    customerId: string,
    status: string
}

export async function createCustomerConsumer() {
    console.log('CUSTOMER CONSUMER')
    const consumer = await kafkaConsumer('ORDER_STATUS')
    await consumer.run({
        eachMessage: async ({ message }) => {
            const messageToString = message.value!.toString()
            console.log(messageToString)
            const statusConsumer = JSON.parse(messageToString) as CustomerConsumer
            console.log(`ATUALIZAÇÃO DE STATUS -CLIENT:${statusConsumer.customerId}- Stataus: ${statusConsumer.status}`)
        },
    })
}

createCustomerConsumer()