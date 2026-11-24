import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

// DTO para validar los datos al crear un rol
export class CreateRoleDto {

  // Nombre obligatorio y de maximo 255 caracteres
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  role_name!: string;

  // Descripcion opcional, pero debe ser texto
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
