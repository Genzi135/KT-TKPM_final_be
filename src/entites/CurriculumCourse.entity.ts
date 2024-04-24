import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course.entity';
import { Curriculum } from './Curriculum.entity';
import { CurriculumCourseType } from 'src/interfaces/course.interface';
import { PrerequisteCourse } from './PrerequisteCourse.entity';

@Entity({ name: 'curriculum_courses' })
export class CurriculumCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Curriculum)
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: Curriculum;

  @Column({ name: 'semester', default: 1 })
  semester: number;

  @Column({ name: 'type', enum: CurriculumCourseType, type: 'enum', default: CurriculumCourseType.REQUIRED })
  type: CurriculumCourseType;

  @Column({ name: 'max_elective_credit', default: 0 })
  maxElectiveCredits: number;

  @OneToMany(() => PrerequisteCourse, (prerequisteCourse) => prerequisteCourse.course)
  prerequisteCourses: PrerequisteCourse[];
}
