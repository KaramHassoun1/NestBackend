import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe,  } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Apply validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform request payloads to DTO objects
    }),
  );

  // Apply class serializer interceptor globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}

bootstrap();
