import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course.entity";
import { Student } from "./Student.entity";
import { Semester } from "./Semester.entity";

@Entity({name: 'grades'})
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, {eager: true})
    @JoinColumn({name: 'course_id'})
    course: Course;

    @ManyToOne(() => Student)
    @JoinColumn({name: 'student_id'})
    student: Student;

    @ManyToOne(() => Semester, {eager: true})
    @JoinColumn({name: 'semester_id'})
    semester: Semester;

    @Column({name: 'lethical_grade_1'})
    lethicalGrade1: number;

    @Column({name: 'lethical_grade_2'})
    lethicalGrade2: number;

    @Column({name: 'lethical_grade_3'})
    lethicalGrade3: number;

    @Column({name: 'lethical_grade_4'})
    lethicalGrade4: number;

    @Column({name: 'practial_grade_1'})
    practialGrade1: number;

    @Column({name: 'practial_grade_2'})
    practialGrade2: number;

    @Column({name: 'practial_grade_3'})
    practialGrade3: number;

    @Column({name: 'practial_grade_4'})
    midTermGrade: number;

    @Column({name: 'final_grade'})
    finalGrade: number;

    @Column({name: 'average_grade'})
    averageGrade: number;

    @Column({name: 'is_passed'})
    isPassed: boolean;
}