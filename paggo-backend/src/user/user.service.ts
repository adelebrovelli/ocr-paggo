import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'; // Importação de bcryptjs
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, name: string, password: string): Promise<any> {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Usuário com esse e-mail já existe.');
    }

    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = bcrypt.hashSync(password, salt); 

   
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
