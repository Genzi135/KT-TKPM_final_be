import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CourseService } from "../services/Course.service";
import { AuthGuard } from "src/auth/guards/AuthGuard.guard";
import { ClassService } from "../services/Class.service";

@Controller('/api/v1/courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
        private readonly classService: ClassService
    ) {}

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

    @Get('/class/:courseId/semester/:semesterId')
    @UseGuards(AuthGuard)
    async getClassByCourseId(@Param('courseId') courseId: number, @Param('semesterId') semesterId: number) {
        return this.classService.getClassByCourseId({courseId, semesterId});
    }
}