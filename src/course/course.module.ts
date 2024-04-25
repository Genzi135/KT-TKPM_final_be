import { Module } from "@nestjs/common";
import { CourseController } from "./controllers/Course.controller";
import { CourseService } from "./services/Course.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Curriculum } from "src/entites/Curriculum.entity";
import { CurriculumCourse } from "src/entites/CurriculumCourse.entity";
import { Grade } from "src/entites/Grade.entity";
import { Student } from "src/entites/Student.entity";
import { JwtModule } from "@nestjs/jwt";
import { Class } from "src/entites/Class.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Curriculum, CurriculumCourse, Grade, Student, Class]),
        JwtModule
    ],
    controllers: [CourseController],
    providers: [CourseService],
    exports: [],
})
export class CourseModule {}