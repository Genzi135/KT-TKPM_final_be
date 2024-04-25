import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CourseService } from "../services/Course.service";
import { AuthGuard } from "src/auth/guards/AuthGuard.guard";

@Controller('/api/v1/courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post('/curriculum-courses')
    async getCurriculumCourses(@Body(){academicYear, majorId}) {
        return this.courseService.getCurrilumCourses({academicYear, majorId});
    }

    @Get('/registration-courses/:semesterId')
    @UseGuards(AuthGuard)
    async getCourseForRegistration(@Req() req, @Param('semesterId') semesterId: number) {
        const {id} = req['user'];

        return this.courseService.getCourseForRegistration({studentId: id, semesterId});
    }
}