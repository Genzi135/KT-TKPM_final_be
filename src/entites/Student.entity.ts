import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Major } from './Major.entity';
import { MajorClass } from './MajorClass.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'academic_year' })
  academicYear: string;

  @ManyToOne(() => Major)
  @JoinColumn({ name: 'major_id' })
  major: Major;

  @ManyToOne(() => MajorClass)
  @JoinColumn({ name: 'major_class_id' })
  majorClass: MajorClass;
}
