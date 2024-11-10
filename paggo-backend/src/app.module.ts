import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './module/upload/upload.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [PrismaModule, UploadModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
