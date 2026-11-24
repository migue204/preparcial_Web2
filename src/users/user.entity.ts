import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Role } from '../roles/role.entity';

@Entity('users')
export class User {
  // Aquí escribirás las propiedades
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true }) //sig que no se puede repetir
  email!: string;
  @Column({ select: false }) //Evita que la contraseña aparezca
  //automáticamente cuando consultamos un usuario.
  password!: string;
  @Column()
  name!: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  phone?: string | null; // Telefono opcional del usuario
  @Column({ type: 'boolean', default: true })
  is_active!: boolean; //si alguien inicia sesion, por defecto sale True
  //SI SALE FALSE, es porque esta bloqueado y debe votar 423 locked
  @CreateDateColumn()
  created_at!: Date; //le pasamos la fecha con el DATE

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    //configura la tabla intermedia
    name: 'user_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles!: Role[];
} // @JoinTable() configura la relación en TypeORM
