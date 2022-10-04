import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
