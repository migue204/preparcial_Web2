
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // Inicia nuestra aplicacion NestJS
  const app = await NestFactory.create(AppModule);

  // Activa las validaciones para todos los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos que no estan en el DTO
      forbidNonWhitelisted: true, // Rechaza campos desconocidos
      transform: true, // Transforma los datos cuando corresponde
    }),
  );
  // Inicia el servidor en el puerto 3000
  await app.listen(process.env.PORT ?? 3000);
}
// Ejecuta la funcion que inicia nuestra aplicacion
void bootstrap();
