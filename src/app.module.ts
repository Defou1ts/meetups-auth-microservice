import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_FILTER } from '@nestjs/core';

import { postgresConfigRegister } from './config/postgres.config';
import { jwtConfigRegister } from './config/jwt.config';
import { encryptionConfigRegister } from './config/encryption.config';
import { Role } from './roles/models/roles.model';
import { MeetupTags } from './users/models/meetup-tags';
import { Meetup } from './users/models/meetups.model';
import { Tag } from './users/models/tags.model';
import { UserMeetups } from './users/models/user-meetups.model';
import { User } from './users/models/users.model';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { HttpExceptionFilter } from './exceptions/rpc.exception.filter';

import type { PostgresConfig } from './config/postgres.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [postgresConfigRegister, jwtConfigRegister, encryptionConfigRegister],
		}),
		SequelizeModule.forRootAsync({
			inject: [postgresConfigRegister.KEY],
			useFactory: ({ host, port, username, password, database }: PostgresConfig) => ({
				dialect: 'postgres',
				host,
				port,
				username,
				password,
				database,
				models: [User, Role, Meetup, Tag, MeetupTags, UserMeetups],
				autoLoadModels: true,
			}),
		}),
		UsersModule,
		RolesModule,
		JwtAuthModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule {}
