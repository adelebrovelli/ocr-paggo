import { Controller, Post, Body, HttpException, HttpStatus, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }, @Request() req) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    req.session.userId = user.id;

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: { email: string; name: string; password: string }) {
    try {
      const newUser = await this.authService.register(registerDto.email, registerDto.name, registerDto.password);
      return { message: 'User registered successfully', user: newUser };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
