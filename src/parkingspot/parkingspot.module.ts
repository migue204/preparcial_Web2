import { Module } from '@nestjs/common';
import { ParkingspotController } from './parkingspot.controller';
import { ParkingspotService } from './parkingspot.service';

@Module({
  controllers: [ParkingspotController],
  providers: [ParkingspotService]
})
export class ParkingspotModule {}
