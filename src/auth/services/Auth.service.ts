import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from 'src/entites/Authentication.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/LoginDto';
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

    const user = await this.authRepository.findOne({ where: { username } });
    if (!user) throw new BadRequestException('Bad credentials');

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) throw new BadRequestException('Bad credentials');

    const payload = { id: user.username, type: user.type };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
