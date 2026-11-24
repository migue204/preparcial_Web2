
import { Injectable, ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';

import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

  // Conectamos el Service con la tabla roles
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  // Crea un rol nuevo en la base de datos
  async create(dto: CreateRoleDto) {

    // Preparamos un rol con los datos recibidos
    const nuevoRol = this.rolesRepository.create(dto);

    try {
      // Guardamos el rol en PostgreSQL
      const rolGuardado = await this.rolesRepository.save(nuevoRol);

      // Devolvemos el mensaje y el ID del rol creado
      return {
        message: 'Rol creado con éxito',
        roleId: rolGuardado.id,
      };

    } catch (error) {

      // Si el nombre ya existe, PostgreSQL devuelve el error 23505
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string }).code === '23505'
      ) {
        throw new ConflictException('role_name ya existe');
      }

      // Si ocurre otro error, dejamos que NestJS lo maneje
      throw error;
    }
  }

  // Busca y devuelve todos los roles registrados
  // Busca todos los roles guardados en PostgreSQL
  async findAll() {

    // Consultamos la tabla roles
    return this.rolesRepository.find({

      // Indicamos que columnas queremos devolver
      select: {
        id: true, // Devuelve el ID
        role_name: true, // Devuelve el nombre del rol
        description: true, // Devuelve la descripcion
      },

    });
  }
}
