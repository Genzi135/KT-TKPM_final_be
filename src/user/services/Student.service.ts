import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entites/Student.entity';
import { Repository } from 'typeorm';

export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getMe(username: string) {
    return this.studentRepository.findOne({ where: { id: username } });
  }
}
