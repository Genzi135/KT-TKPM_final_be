import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { GradeService } from '../services/GradeService.service';
import { AuthGuard } from 'src/auth/guards/AuthGuard.guard';
import { Request } from 'express';

@Controller('/api/v1/grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getStudentGrades(@Req() req: Request) {
    const { id: studentId } = req['user'];
    return this.gradeService.getStudentGrades(studentId);
  }
}
