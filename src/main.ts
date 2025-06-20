import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('WhatsApp API')
    .setDescription('API to send WhatsApp messages using whatsapp-web.js')
    .setVersion('1.0')
    .addTag('whatsapp')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Available at /docs

  await app.listen(3300);
}
bootstrap();
