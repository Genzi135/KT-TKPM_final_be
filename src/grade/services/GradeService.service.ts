import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from 'src/entites/Grade.entity';
import { Repository } from 'typeorm';
import { GradeResponseDto } from '../dtos/GradeResponseDto';
import { GradeGroupBySemester } from 'src/interfaces/Grade.interface';
import { generateLetterGrade } from '../utils/utils';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  async getStudentGrades(studentId: string): Promise<any> {
    const grades = await this.gradeRepository.find({
      where: { student: { id: studentId } },
      relations: ['course', 'semester'],
    });

    const gradeDto = grades.map((grade) => new GradeResponseDto(grade));

    const gradesGroupBySemester: GradeGroupBySemester = gradeDto.reduce((acc, grade) => {
      (acc[grade.semester] = acc[grade.semester] || []).push(grade);
      return acc;
    }, {});

    let totalCredits = 0;
    let accumulatedGrade = 0;
    let accumulatedGpa4 = 0;
    let accumulatedLetterGrade = 0;

    const result = Object.entries(gradesGroupBySemester).map(([semester, grades]) => {
      let semesterCredits = 0;
      let semesterGrade = 0;
      let semesterGpa4 = 0;
      let semesterLetterGrade = '';

      grades.forEach((grade) => {
        semesterCredits += grade.isPassed ? grade.courseCredits : 0;
        semesterGrade += grade.averageGrade * grade.courseCredits;
        semesterGpa4 += grade.gpa4 * grade.courseCredits;

        totalCredits += grade.isPassed ? grade.courseCredits : 0;
        accumulatedGrade += grade.averageGrade * grade.courseCredits;
        accumulatedGpa4 += grade.gpa4 * grade.courseCredits;
      });

      semesterLetterGrade = generateLetterGrade(Math.round((semesterGpa4 / semesterCredits) * 100) / 100);

      return {
        semester,
        grades,
        semesterCredits,
        semesterGrade: Math.round((semesterGrade / semesterCredits) * 100) / 100,
        semesterGpa4: Math.round((semesterGpa4 / semesterCredits) * 100) / 100,
        semesterLetterGrade,
        totalCredits,
        accumulatedGrade: Math.round((accumulatedGrade / totalCredits) * 100) / 100,
        accumulatedGpa4: Math.round((accumulatedGpa4 / totalCredits) * 100) / 100,
      };
    });
    // log(result);
    return result;
  }
}
