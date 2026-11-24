
import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Can } from '@nestjs/authorization';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AdminPolicy } from '../auth/admin.policy';

@Controller('roles')
export class RolesController {
  constructor(
    // Servicio que trabaja con la tabla roles
    private readonly rolesService: RolesService,
  ) {}

  // Solo admin puede crear nuevos roles
  @Post()
  @Can(AdminPolicy, 'manage')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  // Solo admin puede consultar todos los roles
  @Get()
  @Can(AdminPolicy, 'manage')
  findAll() {
    return this.rolesService.findAll();
  }
}
