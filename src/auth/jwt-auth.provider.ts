
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthenticationRegistry,
  JwtBearerProvider,
  type JwtClaims,
} from '@nestjs/authentication';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class JwtAuth extends JwtBearerProvider<User> {
  constructor(
    // Permite buscar usuarios en PostgreSQL
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    // Registra los metodos de autenticacion de NestJS
    registry: AuthenticationRegistry,
  ) {
    // Lee los tokens Bearer enviados en las peticiones
    super({ realm: 'preparcial' });

    // Activa este proveedor para verificar los JWT
    registry.registerProvider(this);
  }

  // Obtiene el usuario identificado por el token
  validate({ sub }: JwtClaims): Promise<User | null> {
    if (!sub) {
      return Promise.resolve(null);
    }

    // Busca al usuario activo y carga sus roles
    return this.usersRepository.findOne({
      where: {
        id: sub,
        is_active: true,
      },
      relations: {
        roles: true,
      },
    });
  }
}
