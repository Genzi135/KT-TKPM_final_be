import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student.entity";
import { Class } from "./Class.entity";
import { Semester } from "./Semester.entity";

@Entity({name: 'enrollments'})
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student)
    @JoinColumn({name: 'student_id'})
    student: Student;

    @ManyToOne(() => Class)
    @JoinColumn({name: 'class_id'})
    class: Class;

    @ManyToOne(() => Semester)
    @JoinColumn({name: 'semester_id'})
    semester: Semester;

    @Column({name: 'is_enrolled', default: false})
    isEnrolled: boolean;
}