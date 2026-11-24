
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { AssignRolesDto } from './dto/assign-roles.dto';

@Injectable()
export class UsersService {
  constructor(
    // Permite consultar y actualizar usuarios
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    // Permite buscar los roles existentes
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  // GET /users/me: devuelve el perfil del usuario autenticado
  async findMe(id: string) {
    const usuario = await this.usersRepository.findOne({
      where: { id },
      relations: { roles: true },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Devuelve el perfil sin mostrar la contraseña
    return {
      id: usuario.id,
      email: usuario.email,
      name: usuario.name,
      phone: usuario.phone ?? null,
      roles: usuario.roles.map((rol) => rol.role_name),
    };
  }

  // GET /users: lista los usuarios para el administrador
  async findAll() {
    const usuarios = await this.usersRepository.find({
      relations: { roles: true },
      order: { created_at: 'DESC' },
    });

    // Organiza los datos y excluye las contraseñas
    return usuarios.map((usuario) => ({
      id: usuario.id,
      email: usuario.email,
      name: usuario.name,
      phone: usuario.phone ?? null,
      is_active: usuario.is_active,
      created_at: usuario.created_at,
      roles: usuario.roles.map((rol) => rol.role_name),
    }));
  }

  // PATCH /users/:id/roles: cambia los roles de un usuario
  async assignRoles(id: string, dto: AssignRolesDto) {
    // Busca el usuario que vamos a modificar
    const usuario = await this.usersRepository.findOne({
      where: { id },
      relations: { roles: true },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Busca en PostgreSQL los roles solicitados
    const roles = await this.rolesRepository.find({
      where: { role_name: In(dto.roles) },
    });

    // Comprueba que todos los roles realmente existan
    const encontrados = new Set(roles.map((rol) => rol.role_name));
    const faltantes = dto.roles.filter(
      (nombre) => !encontrados.has(nombre),
    );

    if (faltantes.length > 0) {
      throw new BadRequestException(
        `Roles inexistentes: ${faltantes.join(', ')}`,
      );
    }

    // Reemplaza los roles anteriores por los enviados
    usuario.roles = roles;

    // Actualiza la tabla intermedia user_roles
    await this.usersRepository.save(usuario);

    return {
      message: 'Roles asignados con éxito',
    };
  }
}
