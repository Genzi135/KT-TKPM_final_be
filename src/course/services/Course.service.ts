import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Curriculum } from "src/entites/Curriculum.entity";
import { CurriculumCourse } from "src/entites/CurriculumCourse.entity";
import { Repository } from "typeorm";

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Curriculum)
        private readonly curriculumRepository: Repository<Curriculum>
    ){}

    async getCurrilumCourses({academicYear, majorId}): Promise<CurriculumCourse[]> {
        const curriculum = await this.curriculumRepository.findOne({
            where: {
                academicYear,
                major: {id: majorId}
            }
        });
        
        return curriculum.curriculumCourses;
    }
}