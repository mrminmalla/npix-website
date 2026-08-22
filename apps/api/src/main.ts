import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { join } from 'node:path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );

  const origins = config
    .get<string>('CORS_ORIGINS', 'http://localhost:3005,http://localhost:3006')
    .split(',')
    .map((origin) => origin.trim());
  app.enableCors({ origin: origins, credentials: true });

  // Served when STORAGE_DRIVER=local — a no-op path when using S3/MinIO.
  app.useStaticAssets(join(process.cwd(), config.get('UPLOADS_DIR', './uploads')), {
    prefix: '/uploads',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NPIX API')
    .setDescription('Backend API for the NPIX public site and admin panel')
    .setVersion('1.0')
    .addCookieAuth('npix_at')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.get('PORT', 4100));
}

bootstrap();
