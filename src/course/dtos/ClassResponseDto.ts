import { Class } from "src/entites/Class.entity";

export class ClassResponseDto {
    id: number;
    name: string;
    course: string;
    teacher: string;
    currentStudents: number;
    maxStudents: number;
    periodStart: number;
    periodEnd: number;
    dayOfWeek: number;
    periodStartPractice: number;
    periodEndPractice: number;
    dayOfWeekPractice: number;
    room: string;
    roomPractice: string;
    status: string;

    constructor(data: Class) {
        this.id = data.id;
        this.name = data.name;        
        this.course = data.course.name;
        this.teacher = data.teacher.name;
        this.currentStudents = data.currentStudents;
        this.maxStudents = data.maxStudents;
        this.status = data.status;
        this.periodStart = data.periodStart;
        this.periodEnd = data.periodEnd;
        this.dayOfWeek = data.dayOfWeek;
        this.periodStartPractice = data.periodStartPractice;
        this.periodEndPractice = data.periodEndPractice;
        this.dayOfWeekPractice = data.dayOfWeekPractice;
        this.room = data.room;
        this.roomPractice = data.roomPractice;
    }
}