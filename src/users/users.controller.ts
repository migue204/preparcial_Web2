
import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CurrentUser } from '@nestjs/authentication';
import { Can } from '@nestjs/authorization';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { AdminPolicy } from '../auth/admin.policy';

@Controller('users')
export class UsersController {
  constructor(
    // Ejecuta las operaciones sobre los usuarios
    private readonly usersService: UsersService,
  ) {}

  // Cualquier usuario autenticado consulta su propio perfil
  @Get('me')
  @Can.Anyone()
  findMe(@CurrentUser() usuario: User) {
    return this.usersService.findMe(usuario.id);
  }

  // Solo admin puede consultar todos los usuarios
  @Get()
  @Can(AdminPolicy, 'manage')
  findAll() {
    return this.usersService.findAll();
  }

  // Solo admin puede cambiar los roles de otro usuario
  @Patch(':id/roles')
  @Can(AdminPolicy, 'manage')
  assignRoles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignRolesDto,
  ) {
    return this.usersService.assignRoles(id, dto);
  }
}
