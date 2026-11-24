-- Creamos la tabla que une usuarios con roles
CREATE TABLE user_roles (
    user_id UUID NOT NULL,    --ID del usuario
    role_id UUID NOT NULL,    --ID del rol
    --Evita repetir la misma combinacion
    PRIMARY KEY (user_id, role_id),
    --Conectamos con la tabla users
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)    --Conectamos con la tabla roles

);