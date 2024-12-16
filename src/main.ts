import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'], // Origens permitidas
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos permitidos
    allowedHeaders: 'Content-Type,Accept,Authorization', // Headers permitidos
    credentials: true, // Permitir credenciais
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API de Vendas e Compras')
    .setDescription('API para gerenciamento de vendas e compras de autopeças')
    .setVersion('1.0')
    .addTag('vendas')
    .addTag('compras')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
