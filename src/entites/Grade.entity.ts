import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course.entity';
import { Student } from './Student.entity';
import { Semester } from './Semester.entity';
import { GradeClassification, GradeLetter } from 'src/interfaces/Grade.interface';

@Entity({ name: 'grades' })
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, { eager: true })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Semester, { eager: true })
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @Column({ name: 'lethical_grade_1', default: null, type: 'double' })
  lethicalGrade1: number;

  @Column({ name: 'lethical_grade_2', default: null, type: 'double' })
  lethicalGrade2: number;

  @Column({ name: 'lethical_grade_3', default: null, type: 'double' })
  lethicalGrade3: number;

  @Column({ name: 'lethical_grade_4', default: null, type: 'double' })
  lethicalGrade4: number;

  @Column({ name: 'practial_grade_1', default: null, type: 'double' })
  practialGrade1: number;

  @Column({ name: 'practial_grade_2', default: null, type: 'double' })
  practialGrade2: number;

  @Column({ name: 'practial_grade_3', default: null, type: 'double' })
  practialGrade3: number;

  @Column({ name: 'mid_term_grade', default: null, type: 'double' })
  midTermGrade: number;

  @Column({ name: 'final_grade', default: null, type: 'double' })
  finalGrade: number;

  @Column({ name: 'average_grade', default: null, type: 'double' })
  averageGrade: number;

  @Column({ name: 'gpa_4', default: null, type: 'double' })
  gpa4: number;

  @Column({ name: 'grade_letter', enum: GradeLetter, type: 'enum', default: null })
  gradeLetter: GradeLetter;

  @Column({ name: 'classification', enum: GradeClassification, type: 'enum', default: null })
  classification: GradeClassification;

  @Column({ name: 'is_passed' })
  isPassed: boolean;
}
