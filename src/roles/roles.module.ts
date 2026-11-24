import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    // Permite utilizar el repositorio de Role
    TypeOrmModule.forFeature([Role]),
  ],

  // Registra el Controller que recibe peticiones
  controllers: [RolesController],

  // Registra el Service que trabaja con PostgreSQL
  providers: [RolesService],
})
export class RolesModule {}
