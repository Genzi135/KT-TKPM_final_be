import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course.entity';

@Entity({ name: 'prerequiste_courses' })
export class PrerequisteCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'prerequiste_course_id' })
  prerequisteCourse: Course;
}
