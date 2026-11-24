
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

// Valida el correo y contraseña del login
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}