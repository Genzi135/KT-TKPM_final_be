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
import { Enrollment } from "src/entites/Enrollment.entity";

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
        private readonly classRepository: Repository<Class>,
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
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
            return new CourseResponseDto(curriculumCourse);
        })
        return result;
    }

    async getCourseForRegistration({ studentId, semesterId }): Promise<CourseResponseDto[]> {
        const student = await this.studentRepository.findOne({ where: { id: studentId }, relations: ['major'] });

        const [curriculum, getStudentCourseHasGrade, classInSemeseter, studentEnrollments] = await Promise.all([
            this.curriculumRepository.findOne({
                where: {
                    academicYear: student.academicYear,
                    major: { id: student.major.id }
                },
                relations: ['curriculumCourses', 'curriculumCourses.course', 'curriculumCourses.course.prerequisteCourses']
            }),
            this.gradeRepository.find({ where: { student: { id: studentId } } }),
            this.classRepository.find({ where: { semester: { id: semesterId } }, relations: ['course'] }),
            this.enrollmentRepository.find({ where: { student: { id: studentId }, semester: {id: semesterId} }, relations: ['class', 'class.course'] })
        ]);

        const curriculumCourses = curriculum.curriculumCourses;

        let result = [];

        result = curriculumCourses.filter(course => {
            const isCourseHasGrade = getStudentCourseHasGrade.some(grade => grade.course.id === course.course.id);
            return !isCourseHasGrade;
        })
        
        const courseInCurrentSemester = classInSemeseter.map(class_ => class_.course);
        result = result.filter(el => {
            const isCourseInCurrentSemester = courseInCurrentSemester.some(course => {
                return el.course.id === course.id
            });

            return isCourseInCurrentSemester;
        })

        result = result.filter(el => {
            const isStudentEnrolled = studentEnrollments.some(enrollment => {
                return enrollment.class.course.id === el.course.id;
            })

            return !isStudentEnrolled;
        })

        result = result.map(curriculumCourse => {
            return new CourseResponseDto(curriculumCourse);
        })
        return result;
    }
}