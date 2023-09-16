import { IsString } from 'class-validator';

export class JwtLoginResponseDto {
	@IsString()
	readonly accessToken: string;

	@IsString()
	readonly refreshToken: string;
}
