import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { parkingspotController } from 'src/parkingspot/parkingspot.controller';

@Injectable()
export class ReservationsService {

  constructor(
    // Permite trabajar con la tabla products
    @InjectRepository(Reservation)
    private readonly repo: Repository<Reservation>,
  ) {}

  //crear reserva
  async create(dto: create-parkingspotController.dto) {
    const producto = this.repo.create(dto);
    return this.repo.save(producto);
  }


}
