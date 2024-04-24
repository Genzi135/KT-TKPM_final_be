import { Student } from 'src/entites/Student.entity';

export class StudentResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  academicYear: string;
  major: string;
  majorClass: string;

  constructor(student: Student) {
    this.id = student.id;
    this.name = student.name;
    this.email = student.email;
    this.phone = student.phone;
    this.dateOfBirth = student.dateOfBirth.toString();
    this.academicYear = student.academicYear;
    this.major = student.major.name;
    this.majorClass = student.majorClass.name;
  }
}
