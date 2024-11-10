import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.hashed_password)) {
      const { hashed_password, ...result } = user; // Remove a senha antes de retornar
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }), // Configuração de expiração do token
    };
  }

  async register(email: string, name: string, password: string): Promise<any> {

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException('Usuário com esse e-mail já existe.', HttpStatus.BAD_REQUEST);
    }


    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);


    const newUser = await this.userService.createUser(email, name, hashedPassword);


    const payload = { username: newUser.email, sub: newUser.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      message: 'Usuário registrado com sucesso',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      access_token: token,
    };
  }
}
