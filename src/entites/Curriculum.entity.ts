import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Major } from './Major.entity';

@Entity({ name: 'curriculums' })
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'academic_year' })
  academicYear: string;

  @ManyToOne(() => Major)
  @JoinColumn({ name: 'major_id' })
  major: Major;
}
