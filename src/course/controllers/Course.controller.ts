import { Body, Controller, Get, Post } from "@nestjs/common";
import { CourseService } from "../services/Course.service";

@Controller('/api/v1/courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post('/curriculum-courses')
    async getCurriculumCourses(@Body(){academicYear, majorId}) {
        return this.courseService.getCurrilumCourses({academicYear, majorId});
    }
}