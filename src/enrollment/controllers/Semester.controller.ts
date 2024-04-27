import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { SemesterService } from "../services/Semester.service";
import { AuthGuard } from "src/auth/guards/AuthGuard.guard";

@Controller('/api/v1/semesters')
export class SemesterController {
    constructor(
        private semesterService: SemesterService
    ){}

    @Get('/')
    @UseGuards(AuthGuard)
    async getSemesters(@Req() req: Request){
        const {id: userId} = req['user'];
        
        return this.semesterService.getSemesters(userId);
    }
}