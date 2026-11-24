import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParkingSpot } from './parkingspot.entity';

@Injectable()
export class ParkingSpotService {

  constructor(
    // Permite trabajar con la tabla products
    @InjectRepository(ParkingSpot)
    private readonly repo: Repository<ParkingSpot>,
  ) {}

  // 1. Crear un puesto de parqueo
  async create(dto: CreateProductDto) {
    const spot = this.repo.create(dto);
    return this.repo.save(spot);
  }

  // 2. Consultar todos los puestos de parqueo
  async findAll() {
    return this.repo.find();
  }

  // 3. Consultar un puesto de parqueo por ID
  async findOne(id: string) {
    const spot = await this.repo.findOne({
      where: { id },
    });

    if (!spot) {
      throw new NotFoundException('Puesto de parqueo no encontrado');
    }

    return spot;
  }
  
}
