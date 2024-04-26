import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/entites/Grade.entity';
import { Repository } from 'typeorm';
import { CourseResponseDto } from '../dtos/CourseResponseDto';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  async getStudentGrades(studentId: string): Promise<CourseResponseDto[]> {
    const grades = await this.gradeRepository.find({
      where: { student: { id: studentId } },
      relations: ['course', 'semester'],
    });

    const results = grades.map((grade) => new CourseResponseDto(grade));

    return results;
  }
}
