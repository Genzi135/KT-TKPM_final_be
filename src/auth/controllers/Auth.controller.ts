import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/Auth.service';
import { LoginDto } from '../dtos/LoginDto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Req() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
