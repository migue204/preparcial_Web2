
-- Creamos la tabla donde van los roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),-- ID del rol, se crea solo y es unico
    -- Nombre del rol, es obligatorio y no se puede repetir
    role_name VARCHAR(255) NOT NULL UNIQUE,
    
    description VARCHAR(255)-- Descripcion del rol, puede quedar vacia
);
