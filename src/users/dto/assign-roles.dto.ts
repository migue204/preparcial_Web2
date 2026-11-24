
import {
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  IsString,
  IsNotEmpty,
} from 'class-validator';

// Valida los nombres de roles que asigna el administrador
export class AssignRolesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  roles!: string[];
}
