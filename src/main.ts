import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

import type { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: ['amqp://admin:admin@rabbit:5672'],
			queue: 'meetups_queue',
			queueOptions: {
				durable: false,
			},
		},
	});

	await app.listen();
}
void bootstrap();
