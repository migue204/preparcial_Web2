
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

// Valida los datos cuando alguien se registra
export class RegisterDto {
  @IsEmail()
  @MaxLength(255)
  email!: string;

  // La contraseña es obligatoria
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  password!: string;

  // Nombre obligatorio
  @IsString()
  @IsNotEmpty()
  name!: string;

  // El telefono es opcional
  @IsOptional()
  @IsString()
  phone?: string;
}
