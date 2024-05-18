import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Semester } from "./Semester.entity";
import { Teacher } from "./Teacher.entity";
import { ClassStatus, ClassType } from "src/interfaces/class.interface";
import { Course } from "./Course.entity";

@Entity({name: 'classes'})
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'max_students'})
    maxStudents: number;

    @Column({name: 'current_students'})
    currentStudents: number;

    @ManyToOne(() => Semester)
    @JoinColumn({name: 'semester_id'})
    semester: Semester;

    @ManyToOne(() => Teacher, {eager: true})
    @JoinColumn({name: 'teacher_id'})
    teacher: Teacher;

    @ManyToOne(() => Course, {eager: true})
    @JoinColumn({name: 'course_id'})
    course: Course;

    @Column({name: 'period_start'})
    periodStart: number;

    @Column({name: 'period_end'})
    periodEnd: number;
    
    @Column({name: 'day_of_week'})
    dayOfWeek: number;

    @Column({name: 'period_start_practice'})
    periodStartPractice: number;

    @Column({name: 'period_end_practice'})
    periodEndPractice: number;
    
    @Column({name: 'day_of_week_practice'})
    dayOfWeekPractice: number;

    @Column({name: 'room'})
    room: string;

    @Column({name: 'room_practice'})
    roomPractice: string;

    @Column({name: 'type', type: 'enum', enum: ClassType, default: ClassType.LECTURE})
    type: ClassType;

    @Column({name: 'status', type: 'enum', enum: ClassStatus, default: ClassStatus.PLAN})
    status: ClassStatus;
}