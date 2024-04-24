import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Faculty } from './Faculty.entity';

@Entity({ name: 'majors' })
export class Major {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'major_code' })
  @Index({ unique: true })
  majorCode: string;

  @ManyToOne(() => Faculty)
  @JoinColumn({ name: 'faculty_id' })
  faculty: Faculty;
}
