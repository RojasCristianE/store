import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true
      }
    )
  );

  // app.use((req: any, res: any, next: any) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   // Opciones adicionales para permitir métodos, encabezados, etc.
  //   next();
  // });

  // set up cors to allow requests from the client
  app.enableCors({
    origin: 'http://localhost:5173'
  });

  await app.listen(3000);
}
bootstrap();
