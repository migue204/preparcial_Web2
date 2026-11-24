import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { User } from '../users/user.entity';
export enum ChargerType {
  STANDARD = 'STANDARD',
  FAST = 'FAST',
  ULTRA_FAST = 'ULTRA_FAST',
}
// Representa nuestra tabla reservations
@Entity('parkingspot')
export class ParkingSpot {
    //id (PK,uuid)
    //code(string,unico,not null)
    //charger_type(enum: 'standard' | 'fast' | 'ultra-fast', not null)
    //id_supervisor (FK,uuid,not null)
    //created_at (timestamp, default: now)
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
    code!: string;

    @Column({
        type: 'enum',
        enum: ChargerType,
        nullable: false,
    })
    charger_type: ChargerType;

    @Column({ type: 'uuid', nullable: false })
    id_supervisor!: string;
    }
    @Column({ type: 'date', nullable: false })
    date: Date; // o Date

    @Column({ type: 'varchar', length: 6, nullable: false })
    vehicle_plate: string; // Nota: La validación de formato 'ABC123' se hace en el DTO con @Matches(/^[A-Z]{3}[0-9]{3}$/)

    @Column({
        type: 'enum',
        enum: ChargerType,
        nullable: false,
    })
    vehicle_max_charge: ChargerType;

    @Column({
        type: 'enum',
        enum: ChargerType,
        default: ChargerType.STANDARD,
    })
    status: ChargerType;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    //RELACIONES

    // Muchas reservas pertenecen a un Usuario (ManyToOne)
    @ManyToOne(() => User, (user) => user.reservations, { nullable: false })
    @JoinColumn({ name: 'id_user' })
    user: User;

    // Muchas reservas pertenecen a un Espacio de Parqueo (ManyToOne)
    @ManyToOne(() => ParkingSpot, (spot) => spot.reservations, { nullable: false })
    @JoinColumn({ name: 'id_spot' })
    parkingSpot: ParkingSpot;
    }


