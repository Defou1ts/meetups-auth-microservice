import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { Controller } from '@nestjs/common';

import { JwtAuthService } from './jwt-auth.service';

@Controller()
export class JwtAuthController {
	constructor(private readonly authService: JwtAuthService) {}

	@MessagePattern('auth/jwt/login')
	async login(@Payload() userDto: CreateUserDto) {
		return await this.authService.login(userDto);
	}

	@MessagePattern('auth/jwt/register')
	async registration(@Payload() userDto: CreateUserDto) {
		return await this.authService.registration(userDto);
	}

	@MessagePattern('auth/jwt/updateAccess')
	async updateAccess(@Payload('email') email: string) {
		return await this.authService.getNewAccessAndRefreshToken({ email });
	}
}
