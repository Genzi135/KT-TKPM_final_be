import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Semester } from "src/entites/Semester.entity";
import { SemesterService } from "./services/Semester.service";
import { JwtModule } from "@nestjs/jwt";
import { Student } from "src/entites/Student.entity";
import { SemesterController } from "./controllers/Semester.controller";
import { Class } from "src/entites/Class.entity";
import { Enrollment } from "src/entites/Enrollment.entity";
import { EnrollmentController } from "./controllers/Enrollment.controller";
import { EnrollmentService } from "./services/Enrollment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Semester, Student, Class, Enrollment]),
        JwtModule
    ],
    controllers: [SemesterController, EnrollmentController],
    providers: [SemesterService, EnrollmentService]
})
export class EnrollmentModule {}