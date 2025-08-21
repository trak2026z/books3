import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:5173'], credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // odrzuca pola spoza DTO
      forbidNonWhitelisted: true,  // błąd przy nieznanych polach
      transform: true,             // automatycznie konwertuje typy
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
