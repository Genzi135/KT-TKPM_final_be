import { Class } from 'src/entites/Class.entity';
import { Enrollment } from 'src/entites/Enrollment.entity';

export class EnrollmentResponse {
  id: number;
  className: string;
  currentStudents: number;
  maxStudents: number;
  teacherName: string;
  isEnrolled: boolean;
  classData: Class;

  constructor(enrollment: Enrollment) {
    this.id = enrollment.id;
    this.className = enrollment.class.name;
    this.teacherName = enrollment.class.teacher.name;
    this.currentStudents = enrollment.class.currentStudents;
    this.maxStudents = enrollment.class.maxStudents;
    this.isEnrolled = enrollment.isEnrolled;
    this.classData = enrollment.class;
  }
}
