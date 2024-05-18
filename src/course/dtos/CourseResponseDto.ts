import { Course } from "src/entites/Course.entity";
import { CurriculumCourse } from "src/entites/CurriculumCourse.entity";
import { Major } from "src/entites/Major.entity";
import { CourseType, CurriculumCourseType } from "src/interfaces/course.interface";

export class CourseResponseDto {
    id: number;
    name: string;
    courseType: CourseType;
    theorySessions: number;
    practiceSessions: number;
    credits: number;
    major: Major;
    maxElectiveCredits: number;
    type: CurriculumCourseType;
    semester: number;
    prerequisteCourses: Course[];

    constructor(data: CurriculumCourse) {
        this.id = data.id;
        this.name = data.course.name;
        this.courseType = data.course.type;
        this.theorySessions = data.course.theorySessions;
        this.practiceSessions = data.course.practiceSessions;
        this.credits = data.course.credits;
        this.major = data.course.major;
        this.prerequisteCourses = data.course.prerequisteCourses.map(prerequisteCourse => prerequisteCourse.prerequisteCourse);
        this.maxElectiveCredits = data.maxElectiveCredits
        this.type = data.type;
        this.semester = data.semester;
    }
}