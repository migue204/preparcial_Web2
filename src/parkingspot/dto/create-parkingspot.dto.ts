import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

// Valida los datos para crear
export class CreateParkingSpotDto {
    @IsString()
    @IsNotEmpty()
    code!: string;

    @IsString()
    @IsNotEmpty()
    charger_type!: 'standard' | 'fast' | 'ultra-fast';

    @IsString()
    @IsNotEmpty()
    id_supervisor!: string;

}
