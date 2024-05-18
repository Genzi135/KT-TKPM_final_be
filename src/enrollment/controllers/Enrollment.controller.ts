import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/AuthGuard.guard";
import { EnrollmentService } from "../services/Enrollment.service";
import { response } from "express";

@Controller('/api/v1/enrollments')
export class EnrollmentController {
    constructor(
        private enrollmentService: EnrollmentService
    ){}

    @Post('/class/:classId')
    @UseGuards(AuthGuard)
    async getSemesters(
                        @Req() req: Request, 
                        @Param('classId') classId: number){
        const {id: userId} = req['user'];
        await this.enrollmentService.enrollCourse(classId, userId);
        return response.status(201);
    }

    @Delete('/class/:classId')
    @UseGuards(AuthGuard)
    async deleteEnrollment(
                            @Req() req: Request, 
                            @Param('classId') classId: number){
        const {id: userId} = req['user'];
        await this.enrollmentService.removeEnrolledCourse(classId, userId);
        return response.status(200);
    }

    @Get('/semester/:semesterId')
    @UseGuards(AuthGuard)
    async getEnrolledCoursesBySemester(
                                        @Req() req: Request, 
                                        @Param('semesterId') semesterId: number){
        const {id: userId} = req['user'];
        return this.enrollmentService.getEnrolledCoursesBySemester(userId, semesterId);
    }
}