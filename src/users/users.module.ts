
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { Role } from '../roles/role.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    // Habilita los repositorios de usuarios y roles
    TypeOrmModule.forFeature([User, Role]),
  ],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
