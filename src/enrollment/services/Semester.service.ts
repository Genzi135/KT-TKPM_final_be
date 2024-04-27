import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Semester } from "src/entites/Semester.entity";
import { Student } from "src/entites/Student.entity";
import { Repository } from "typeorm";

@Injectable()
export class SemesterService {
    constructor(
        @InjectRepository(Semester)
        private semesterRepository: Repository<Semester>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ){}

    async getSemesters(userId: string): Promise<Semester[]>{
        const student = await this.studentRepository.findOne({
            where: {
                id: userId
            }
        });

        if(!student) throw new Error('Something went wrong!');

        const getSemesters = await this.semesterRepository.createQueryBuilder('semester')
            .where('SUBSTRING(semester.academicYear, 1, 4) >= :year', {year: student.academicYear.substring(0, 4)})
            .getMany();
        
        return getSemesters;
    }
}