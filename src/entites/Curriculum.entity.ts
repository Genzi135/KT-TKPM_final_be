import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Major } from './Major.entity';
import { CurriculumCourse } from './CurriculumCourse.entity';

@Entity({ name: 'curriculums' })
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'academic_year' })
  academicYear: string;

  @ManyToOne(() => Major)
  @JoinColumn({ name: 'major_id' })
  major: Major;

  @OneToMany(() => CurriculumCourse, (curriculumCourse) => curriculumCourse.curriculum, {eager: true, cascade: true})
  curriculumCourses: CurriculumCourse[];
}
