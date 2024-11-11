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
    if (!email || !password) {
      throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
    }
  
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
  
    

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  
    const { hashed_password, ...result } = user;
    return result;
  }
  

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };
  }

  async register(email: string, name: string, password: string): Promise<any> {
    if (!email || !name || !password) {
      throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
    }
  
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException('This email address is already taken', HttpStatus.BAD_REQUEST);
    }
    
    const newUser = await this.userService.createUser(email, name, password);
  
    const payload = { username: newUser.email, sub: newUser.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
  
    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      access_token: token,
    };
  }
  
}
