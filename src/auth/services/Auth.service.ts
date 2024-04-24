import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from 'src/entites/Authentication.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/LoginDto';
import { LoginResponseDto } from '../dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Authentication)
    private readonly authRepository: Repository<Authentication>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const auth = await this.authRepository.findOne({ where: { username } });
    if (!auth) throw new BadRequestException('Bad credentials');

    const isPasswordMatch = await auth.comparePassword(password);
    if (!isPasswordMatch) throw new BadRequestException('Bad credentials');

    const payload = { id: auth.username, type: auth.type };
    const token = this.jwtService.sign(payload);

    return new LoginResponseDto(token);
  }
}
