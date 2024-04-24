import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { StudentService } from '../services/Student.service';
import { AuthGuard } from 'src/auth/guards/AuthGuard.guard';

@Controller('/api/v1/students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/getMe')
  @UseGuards(AuthGuard)
  async getMe(@Req() request: Request) {
    const user = request['user'];

    return await this.studentService.getMe(user.id);
  }
}
