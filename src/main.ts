import { NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AtGuard } from './common/guards';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const reflector = new Reflector();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server starts on ${PORT} порте`));
}
start();
