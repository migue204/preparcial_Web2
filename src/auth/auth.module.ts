
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHasher } from '@nestjs/authentication';

import { User } from '../users/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuth } from './jwt-auth.provider';

@Module({
  imports: [
    // Habilita las consultas a la tabla users
    TypeOrmModule.forFeature([User]),
  ],

  // Recibe las peticiones de registro y login
  controllers: [AuthController],

  providers: [
    // Maneja registro y autenticacion
    AuthService,

    // Reconoce los tokens JWT de cada peticion
    JwtAuth,

    // Protege y verifica las contraseñas
    {
      provide: PasswordHasher,
      useFactory: () => new PasswordHasher(),
    },
  ],
})
export class AuthModule {}
