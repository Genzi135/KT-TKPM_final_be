import { Course } from "src/entites/Course.entity";
import { Major } from "src/entites/Major.entity";
import { CourseType } from "src/interfaces/course.interface";

export class CourseResponseDto {
    id: number;
    name: string;
    type: CourseType;
    theorySessions: number;
    practiceSessions: number;
    credits: number;
    major: Major;
    prerequisteCourses: Course[];

    constructor(data: Course) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.theorySessions = data.theorySessions;
        this.practiceSessions = data.practiceSessions;
        this.credits = data.credits;
        this.major = data.major;
        this.prerequisteCourses = data.prerequisteCourses.map(prerequisteCourse => prerequisteCourse.prerequisteCourse);
    }
}