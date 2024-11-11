import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, name: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10); 

    return this.prisma.user.create({
      data: {
        email,
        name,
        hashed_password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
