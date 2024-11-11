import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', 
    credentials: true,               
  });
  app.use(
    session({
      secret: 'your-secret-key', // Substitua por uma chave segura
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Altere para `true` em produção (requer HTTPS)
    }),
  );
  await app.listen(3000);
}
bootstrap();


