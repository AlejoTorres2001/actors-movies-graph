import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.PROD_DOMAIN
        : [
            `http://${process.env.DEV_DOMAIN}:4200`,
            `http://${process.env.DEV_DOMAIN}:3000`,
          ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders:
      'Content-Type, Accept, Authorization, X-Requested-With,  Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
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
