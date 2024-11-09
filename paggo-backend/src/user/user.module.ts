import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module'; // Importa o PrismaModule

@Module({
  imports: [PrismaModule],
})
export class UserModule {}
