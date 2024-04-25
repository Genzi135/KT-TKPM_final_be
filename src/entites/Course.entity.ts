import { CourseType } from 'src/interfaces/course.interface';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Major } from './Major.entity';
import { PrerequisteCourse } from './PrerequisteCourse.entity';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'type', enum: CourseType, type: 'enum', default: CourseType.THEORY })
  type: CourseType;

  @Column({ name: 'theory_sessions', default: 0 })
  theorySessions: number;

  @Column({ name: 'practice_sessions', default: 0 })
  practiceSessions: number;

  @Column({ name: 'credits', default: 0 })
  credits: number;

  @ManyToOne(() => Major)
  @JoinColumn({ name: 'major_id' })
  major: Major;

  @OneToMany(() => PrerequisteCourse, (prerequisteCourse) => prerequisteCourse.course)
  prerequisteCourses: PrerequisteCourse[];
}
