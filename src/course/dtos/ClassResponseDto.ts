import { Class } from "src/entites/Class.entity";

export class ClassResponseDto {
    id: number;
    name: string;
    course: string;
    teacher: string;
    currentStudents: number;
    maxStudents: number;
    status: string;

    constructor(data: Class) {
        this.id = data.id;
        this.name = data.name;        
        this.course = data.course.name;
        this.teacher = data.teacher.name;
        this.currentStudents = data.currentStudents;
        this.maxStudents = data.maxStudents;
        this.status = data.status;
    }
}