import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Class } from "src/entites/Class.entity";
import { Repository } from "typeorm";
import { ClassResponseDto } from "../dtos/ClassResponseDto";

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>
    ) { }

    async getClassByCourseId({courseId, semesterId}): Promise<ClassResponseDto[]> {
        const classes = await this.classRepository.find({
            where: {
                course: {id: courseId},
                semester: {id: semesterId}
            },
            relations: ['course', 'semester']
        });

        const results = classes.map(cl => new ClassResponseDto(cl));
        return results;
    }
}