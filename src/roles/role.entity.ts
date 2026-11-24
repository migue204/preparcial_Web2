import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('roles') //relaciona nuestra clase con la tabla roles
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // ese ! significa que recibira un valor , aunque no lo inicialice

  @Column({ unique: true })
  role_name!: string; //No queremos que otro registro tenga exactamente el mismo nombre.

  @Column({ type: 'varchar', length: 255, nullable: true }) // Descripcion del rol, puede quedar vacia
  description!: string | null;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}
