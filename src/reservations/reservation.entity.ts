import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { ParkingSpot, ChargerType } from '../parkingspot/parkingspot.entity';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false })
  id_user!: string;

  @Column({ type: 'uuid', nullable: false })
  id_spot!: string;

  @Column({ type: 'date', nullable: false })
  date!: string; // o Date

  @Column({ type: 'varchar', length: 6, nullable: false })
  vehicle_plate!: string; // Nota: La validación de formato 'ABC123' se hace en el DTO con @Matches(/^[A-Z]{3}[0-9]{3}$/)

  @Column({
    type: 'enum',
    enum: ChargerType,
    nullable: false,
  })
  vehicle_max_charge!: ChargerType;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  // --- RELACIONES ---

  // Muchas reservas pertenecen a un Usuario (ManyToOne)
  @ManyToOne(() => User, (user) => user.reservations, { nullable: false })
  @JoinColumn({ name: 'id_user' })
  user: User;

  // Muchas reservas pertenecen a un Espacio de Parqueo (ManyToOne)
  @ManyToOne(() => ParkingSpot, (spot) => spot.reservations, { nullable: false })
  @JoinColumn({ name: 'id_spot' })
  parkingSpot: ParkingSpot;
}