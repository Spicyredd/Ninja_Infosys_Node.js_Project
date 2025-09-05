import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/filters/customException.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips away properties that are not in the DTO
    forbidNonWhitelisted: true, // Throws an error if unknown properties are present
    transform: true, // Automatically transforms payloads to be DTO instances
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
