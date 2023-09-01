import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: ['cute-hermit-5325-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'Y3V0ZS1oZXJtaXQtNTMyNSQDksKTGYCIPwA2enddJVvVuhTtlNZ5BHnDVHBeakg',
    password: 'MDRmZmIwZTAtYzM3Zi00OWZiLTlmOGQtYWNlN2Q4ODdiMTIw',
  },
  ssl: true,
})

export { kafka }