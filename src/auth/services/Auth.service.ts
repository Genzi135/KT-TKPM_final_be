import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from 'src/entites/Authentication.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dtos/LoginDto';
import { LoginResponseDto } from '../dtos/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/entites/Student.entity';
import { Teacher } from 'src/entites/Teacher.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Authentication)
    private readonly authRepository: Repository<Authentication>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
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

    let user = null;
    if(auth.type === 'student') user = await this.studentRepository.findOne({ where: { id: auth.username } });
    else if(auth.type === 'teacher') user = await this.teacherRepository.findOne({ where: { id: auth.username } });

    return new LoginResponseDto({token, user});
  }
}
