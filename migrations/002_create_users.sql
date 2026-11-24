
-- Creamos la tabla de usuarios
CREATE TABLE users (
    --ID del usuario, se genera automaticamente
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Correo del usuario, obligatorio y no se puede repetir
    email VARCHAR(255) NOT NULL UNIQUE,
    --Aqui guardamos la contraseña en forma de hash
    password VARCHAR(255) NOT NULL,
    --Nombre del usuario, obligatorio
    name VARCHAR(255) NOT NULL,
    --Telefono del usuario,puedee quedar vacio
    phone VARCHAR(255),
    --Dice si el usuario esta activo, por defecto es TRUE
    is_active BOOLEAN DEFAULT TRUE,
    --Guarda la fecha y hora cuando se crea el usuario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
