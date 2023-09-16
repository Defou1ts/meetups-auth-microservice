import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/models/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { JwtAuthModule } from 'src/auth/jwt-auth.module';

import { User } from './models/users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	imports: [SequelizeModule.forFeature([User, Role]), RolesModule, forwardRef(() => JwtAuthModule)],
	exports: [UsersService],
})
export class UsersModule {}
