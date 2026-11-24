import pg from 'pg';
import { PasswordHasher } from '@nestjs/authentication';

// Lee los datos del administrador desde .env
const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD;
const name = process.env.SEED_ADMIN_NAME || 'Administrador';

// Impide crear el administrador sin credenciales
if (!email || !password || password.length < 12) {
  throw new Error('Configura el correo y una contraseña de al menos 12 caracteres');
}

// Conecta con PostgreSQL usando la configuracion existente
const db = new pg.Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

try {
  await db.connect();
  await db.query('BEGIN');

  // Crea el rol admin si todavia no existe
  const resultadoRol = await db.query(`
    INSERT INTO roles (role_name, description)
    VALUES ('admin', 'Administrador del sistema')
    ON CONFLICT (role_name)
    DO UPDATE SET description = EXCLUDED.description
    RETURNING id
  `);

  // Protege la contraseña del administrador
  const passwordHash = await new PasswordHasher().hash(password);

  // Crea el administrador si el correo no existe
  const resultadoUsuario = await db.query(
    `INSERT INTO users (email, password, name, is_active)
     VALUES ($1, $2, $3, true)
     ON CONFLICT (email) DO NOTHING
     RETURNING id`,
    [email, passwordHash, name],
  );

  // Si ya existia, recupera su ID sin cambiar su contraseña
  let userId = resultadoUsuario.rows[0]?.id;

  if (!userId) {
    const existente = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email],
    );

    userId = existente.rows[0].id;
  }

  // Asigna el rol admin al usuario configurado
  await db.query(
    `INSERT INTO user_roles (user_id, role_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [userId, resultadoRol.rows[0].id],
  );

  await db.query('COMMIT');
  console.log('Administrador inicial configurado correctamente');
} catch (error) {
  // Cancela los cambios si ocurre un problema
  await db.query('ROLLBACK').catch(() => {});
  console.error('Error al crear el administrador:', error.message);
  process.exitCode = 1;
} finally {
  // Cierra la conexion con PostgreSQL
  await db.end().catch(() => {});
}
