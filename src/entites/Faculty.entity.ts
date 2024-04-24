import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'faculties' })
export class Faculty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;
}
