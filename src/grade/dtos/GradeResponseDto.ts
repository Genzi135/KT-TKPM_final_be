import { Grade } from 'src/entites/Grade.entity';

export class GradeResponseDto {
  courseName: string;
  courseCredits: number;
  lethicalGrade1: number;
  lethicalGrade2: number;
  lethicalGrade3: number;
  lethicalGrade4: number;
  practicalGrade1: number;
  practicalGrade2: number;
  practicalGrade3: number;
  midTermGrade: number;
  finalTermGrade: number;
  averageGrade: number;
  gpa4: number;
  letterGrade: string;
  classifictaion: string;
  isPassed: boolean;
  semester: string;

  constructor(grade: Grade) {
    this.courseName = grade.course.name;
    this.courseCredits = grade.course.credits;
    this.lethicalGrade1 = grade.lethicalGrade1;
    this.lethicalGrade2 = grade.lethicalGrade2;
    this.lethicalGrade3 = grade.lethicalGrade3;
    this.lethicalGrade4 = grade.lethicalGrade4;
    this.practicalGrade1 = grade.practialGrade1;
    this.practicalGrade2 = grade.practialGrade2;
    this.practicalGrade3 = grade.practialGrade3;
    this.midTermGrade = grade.midTermGrade;
    this.finalTermGrade = grade.finalGrade;
    this.averageGrade = grade.averageGrade;
    this.gpa4 = grade.gpa4;
    this.letterGrade = grade.gradeLetter;
    this.classifictaion = grade.classification;
    this.isPassed = grade.isPassed;
    this.semester = `${grade.semester.name} (${grade.semester.academicYear})`;
  }
}
