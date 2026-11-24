
import { IsString, IsNotEmpty } from 'class-validator';

// Valida el token usado para renovar la sesion
export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
