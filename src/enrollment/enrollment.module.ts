import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Semester } from "src/entites/Semester.entity";
import { SemesterService } from "./services/Semester.service";
import { JwtModule } from "@nestjs/jwt";
import { Student } from "src/entites/Student.entity";
import { SemesterController } from "./controllers/Semester.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Semester, Student]),
        JwtModule
    ],
    controllers: [SemesterController],
    providers: [SemesterService]
})
export class EnrollmentModule {}