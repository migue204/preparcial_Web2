import {
  Controller,
  Post,
  Get,
  Body,
} from '@nestjs/common';

import { Can } from '@nestjs/authorization';

import { ParkingSpotsService } from './parkingspot.service';
import { CreateParkingSpotDto } from './dto/create-parkingspot.dto';
import { ChargingPolicy } from '../auth/charging.policy';

@Controller('parking-spots')
export class parkingspotController {   
  constructor(
    // Servicio que maneja los puestos en PostgreSQL
    private readonly parkingSpotsService: ParkingSpotsService,
  ) {}
  //POST DEL CREAR PUESTO DE PARQUEO
  @Post()
  @Can(ChargingPolicy, 'createSpot')
  create(@Body() dto: CreateParkingSpotDto) {
    return this.parkingSpotsService.create(dto);
  }

  // GET /parking-spots
  // Admin y supervisor pueden consultar los puestos
  @Get()
  @Can(ChargingPolicy, 'listSpots')
  findAll() {
    return this.parkingSpotsService.findAll();
  }
  
}