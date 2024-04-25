import { Module } from "@nestjs/common";
import { CourseController } from "./controllers/Course.controller";
import { CourseService } from "./services/Course.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Curriculum } from "src/entites/Curriculum.entity";
import { CurriculumCourse } from "src/entites/CurriculumCourse.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Curriculum, CurriculumCourse])
    ],
    controllers: [CourseController],
    providers: [CourseService],
    exports: [],
})
export class CourseModule {}