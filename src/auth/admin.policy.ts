
import { Policy } from '@nestjs/authorization';
import { User } from '../users/user.entity';

@Policy()
export class AdminPolicy {
  // Comprueba si el usuario tiene el rol admin
  before(user: User | null) {
    if (user?.roles?.some((rol) => rol.role_name === 'admin')) {
      return true;
    }
  }

  // Solo los administradores pueden gestionar recursos
  manage(user: User | null): boolean {
    return (
      user?.roles?.some((rol) => rol.role_name === 'admin') ?? false
    );
  }
}
