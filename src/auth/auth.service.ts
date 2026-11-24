
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHasher, TokenService } from '@nestjs/authentication';
import { Repository, QueryFailedError } from 'typeorm';

import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    // Permite consultar la tabla users en PostgreSQL
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    // Crea y verifica hashes de contraseñas
    private readonly passwordHasher: PasswordHasher,

    // Genera los tokens JWT del login
    private readonly tokenService: TokenService,
  ) {}

  // Registra un usuario nuevo sin asignarle roles
  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    // Comprueba si el correo ya existe
    const existe = await this.usersRepository.exists({
      where: { email },
    });

    if (existe) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Protege la contraseña antes de guardarla
    const passwordHash = await this.passwordHasher.hash(dto.password);

    // Crea el usuario sin asignar roles
    const usuario = this.usersRepository.create({
      email,
      password: passwordHash,
      name: dto.name.trim(),
      phone: dto.phone?.trim() || null,
      is_active: true,
      roles: [],
    });

    try {
      // Guarda el usuario en PostgreSQL
      const guardado = await this.usersRepository.save(usuario);

      return {
        message: 'Usuario registrado con éxito',
        userId: guardado.id,
      };
    } catch (error: unknown) {
      // Detecta correos duplicados en la base de datos
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === '23505'
      ) {
        throw new ConflictException('El correo ya está registrado');
      }

      throw error;
    }
  }

  // Inicia sesion y entrega los tokens
  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();

    // Busca al usuario y su contraseña hasheada
    const usuario = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    // Comprueba si la contraseña coincide
    const valida = await this.passwordHasher.verify(
      dto.password,
      usuario?.password,
    );

    // Rechaza credenciales incorrectas
    if (!usuario || !valida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Impide iniciar sesion a usuarios inactivos
    if (!usuario.is_active) {
      throw new HttpException(
        'Usuario inactivo',
        HttpStatus.LOCKED,
      );
    }

    // Genera accessToken, refreshToken y expiresIn
    return this.tokenService.issue(usuario.id, {
      method: 'password',
      claims: { amr: ['pwd'] },
    });
  }
}
