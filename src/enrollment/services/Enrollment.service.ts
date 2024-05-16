import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { log } from "console";
import { Class } from "src/entites/Class.entity";
import { Enrollment } from "src/entites/Enrollment.entity";
import { Student } from "src/entites/Student.entity";
import { Repository } from "typeorm";
import { EnrollmentResponse } from "../dtos/EnrollmentResponse.dto";
import { ClassStatus } from "src/interfaces/class.interface";

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(Class)
        private classRepository: Repository<Class>,
    ){}

    async enrollCourse(classId: number, userId: string): Promise<void>{
        // Code to enroll a student to a course
        const classData = await this.classRepository.findOne({where: {id: classId}, relations: ['semester']});
        if(!classData) throw new BadRequestException('Không tìm thấy lớp học. Vui lòng kiểm tra lại!');
        if(classData.currentStudents >= classData.maxStudents) throw new BadRequestException('Đã đủ số lượng sinh viên cho lớp học này!');
        if(classData.status === ClassStatus.PLAN) throw new BadRequestException('Không thể đăng ký lớp học này!');

        const semesterEntity = classData.semester;
        const now = new Date();
        if(now.getTime() < new Date(semesterEntity.startRegistration).getTime() || now.getTime() > new Date(semesterEntity.endDateRegistration).getTime()) throw new BadRequestException('Không thể đăng ký lớp học này!');
        const studentEntity = new Student();
        studentEntity.id = userId;

        const isEnrolled = await this.enrollmentRepository.findOne({where: {student: studentEntity, class: classData}});
        if(isEnrolled) throw new BadRequestException('Bạn đã đăng ký lớp học này rồi!');
        await this.enrollmentRepository.save({
            student: studentEntity,
            class: classData,
            semester: semesterEntity,
            isEnrolled: false
        })

        classData.currentStudents += 1;
        await this.classRepository.save(classData);  
    }

    async getEnrolledCoursesBySemester(userId: string, semesterId: number): Promise<EnrollmentResponse[]>{
        const enrollments = await this.enrollmentRepository.find({where: {student: {id: userId}, semester: {id: semesterId}}, relations: ['class']});
        const response = enrollments.map(enrollment => new EnrollmentResponse(enrollment));
        return response;
    }
}