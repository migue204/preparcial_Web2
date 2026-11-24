import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '@nestjs/authentication';
import { AuthorizationModule } from '@nestjs/authorization';

import { AdminPolicy } from './auth/admin.policy';

import { User } from './users/user.entity';
import { Role } from './roles/role.entity';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ParkingspotModule } from './parkingspot/parkingspot.module';

@Module({
  imports: [
    // Permite leer las variables de nuestro archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configura la autenticacion JWT
    AuthenticationModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        accessToken: {
          // Clave secreta usada para firmar los tokens
          key: config.getOrThrow<string>('JWT_SECRET'),

          // Identifica nuestra aplicacion
          issuer: 'preparcial-usuarios-roles',
          audience: 'preparcial-api',

          // El accessToken dura 2 minutos
          ttl: '2m',
        },

        // El refreshToken dura 7 dias
        refreshToken: {
          ttl: '7d',
        },
      }),
    }),

    // Activa las reglas de permisos de nuestra APP
    AuthorizationModule.forRoot({
      policies: [AdminPolicy],
    }),

    // Configura la conexion con PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),

        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),

        // Tablas que utilizamos en nuestra APP
        entities: [User, Role],

        // Evita modificar las tablas automaticamente
        synchronize: false,
      }),
    }),

    // Modulos principales de la aplicacion
    UsersModule,
    RolesModule,
    AuthModule,
    ReservationsModule,
    ParkingspotModule,
  ],
})
export class AppModule {}
