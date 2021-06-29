import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));
  // comando | grep pesquisa
  await app.listen(3000);
}
bootstrap();
