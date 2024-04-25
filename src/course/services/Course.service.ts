import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { log } from "console";
import { Class } from "src/entites/Class.entity";
import { Curriculum } from "src/entites/Curriculum.entity";
import { CurriculumCourse } from "src/entites/CurriculumCourse.entity";
import { Grade } from "src/entites/Grade.entity";
import { Student } from "src/entites/Student.entity";
import { Repository } from "typeorm";
import { CourseResponseDto } from "../dtos/CourseResponseDto";

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Curriculum)
        private readonly curriculumRepository: Repository<Curriculum>,
        @InjectRepository(CurriculumCourse)
        private readonly curriculumCourseRepository: Repository<CurriculumCourse>,
        @InjectRepository(Grade)
        private readonly gradeRepository: Repository<Grade>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>
    ) { }

    async getCurrilumCourses({ academicYear, majorId }): Promise<CourseResponseDto[]> {
        const curriculum = await this.curriculumRepository.findOne({
            where: {
                academicYear,
                major: { id: majorId }
            },
            relations: ['curriculumCourses', 'curriculumCourses.course', 'curriculumCourses.course.prerequisteCourses']
        });

        const result = curriculum.curriculumCourses.map(curriculumCourse => {
            return new CourseResponseDto(curriculumCourse.course);
        })
        return result;
    }

    async getCourseForRegistration({ studentId, semesterId }): Promise<CurriculumCourse[]> {
        const student = await this.studentRepository.findOne({ where: { id: studentId }, relations: ['major'] });

        const curriculum = await this.curriculumRepository.findOne({
            where: {
                academicYear: student.academicYear,
                major: { id: student.major.id }
            },
            relations: ['curriculumCourses']
        });
        const curriculumCourses = curriculum.curriculumCourses;

        let result = [];
        const getStudentCourseHasGrade = await this.gradeRepository.find({ where: { student: { id: studentId } } })

        result = curriculumCourses.filter(course => {
            const isCourseHasGrade = getStudentCourseHasGrade.some(grade => grade.course.id === course.course.id);
            return !isCourseHasGrade;
        })

        const classInSemeseter = await this.classRepository.find({ where: { semester: { id: semesterId } }, relations: ['course'] });
        const courseInCurrentSemester = classInSemeseter.map(class_ => class_.course);
        
        result = result.filter(el => {
            const isCourseInCurrentSemester = courseInCurrentSemester.some(course => course.id === course.id);
            return isCourseInCurrentSemester;
        })
        return result;
    }
}