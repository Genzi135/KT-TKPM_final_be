import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entites/Student.entity';
import { Repository } from 'typeorm';
import { StudentResponseDto } from '../dtos/StudentResponseDto';

export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getMe(username: string): Promise<StudentResponseDto> {
    const user = await this.studentRepository.findOne({ where: { id: username }, relations: ['major', 'majorClass'] });

    if (!user) throw new BadRequestException('Something went wrong!');

    return new StudentResponseDto(user);
  }
}
