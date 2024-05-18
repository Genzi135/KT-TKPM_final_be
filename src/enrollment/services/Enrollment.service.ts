import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { log } from "console";
import { Class } from "src/entites/Class.entity";
import { Enrollment } from "src/entites/Enrollment.entity";
import { Student } from "src/entites/Student.entity";
import { Repository } from "typeorm";
import { EnrollmentResponse } from "../dtos/EnrollmentResponse.dto";
import { ClassStatus, ClassType } from "src/interfaces/class.interface";

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(Class)
        private classRepository: Repository<Class>,
    ) { }

    async enrollCourse(classId: number, userId: string): Promise<void> {
        const classData = await this.classRepository.findOne({ where: { id: classId }, relations: ['semester'] });
        if (!classData) throw new BadRequestException('Không tìm thấy lớp học. Vui lòng kiểm tra lại!');
        if (classData.currentStudents >= classData.maxStudents) throw new BadRequestException('Đã đủ số lượng sinh viên cho lớp học này!');
        if (classData.status === ClassStatus.PLAN) throw new BadRequestException('Không thể đăng ký lớp học này!');

        const semesterEntity = classData.semester;
        const periodStart = classData.periodStart;
        const periodEnd = classData.periodEnd;
        const dayOfWeek = classData.dayOfWeek;
        const periodStartPractice = classData.periodStartPractice;
        const periodEndPractice = classData.periodEndPractice;
        const dayOfWeekPractice = classData.dayOfWeekPractice;
        const isPractice = classData.type === ClassType.PRACTICE;

        const checkTimeOverlap = (start1, end1, start2, end2) => {
            return (start1 <= start2 && start2 <= end1) ||
                (start1 <= end2 && end2 <= end1) ||
                (start2 <= start1 && start1 <= end2) ||
                (start2 <= end1 && end1 <= end2);
        };

        const checkDayOverlap = (day1, day2) => {
            return day1 === day2;
        };

        const studentEnrollments = await this.enrollmentRepository.find({ where: { student: { id: userId }, semester: semesterEntity }, relations: ['class'] });
        
        let isTimeConflict = false;
        for (const enrollment of studentEnrollments) {
            const enrolledClass = enrollment.class;

            if (checkDayOverlap(enrolledClass.dayOfWeek, dayOfWeek) ||
                (isPractice && checkDayOverlap(enrolledClass.dayOfWeek, dayOfWeekPractice)) ||
                (isPractice && checkDayOverlap(enrolledClass.dayOfWeekPractice, dayOfWeek)) ||
                (isPractice && checkDayOverlap(enrolledClass.dayOfWeekPractice, dayOfWeekPractice))) {

                if (checkTimeOverlap(enrolledClass.periodStart, enrolledClass.periodEnd, periodStart, periodEnd) ||
                    (isPractice && checkTimeOverlap(enrolledClass.periodStart, enrolledClass.periodEnd, periodStartPractice, periodEndPractice)) ||
                    (isPractice && checkTimeOverlap(enrolledClass.periodStartPractice, enrolledClass.periodEndPractice, periodStart, periodEnd)) ||
                    (isPractice && checkTimeOverlap(enrolledClass.periodStartPractice, enrolledClass.periodEndPractice, periodStartPractice, periodEndPractice))) {
                    isTimeConflict = true;
                    break;
                }
            }
        }

        if (isTimeConflict) throw new BadRequestException('Thời gian học bị trùng lịch!');

        const now = new Date();
        if (now.getTime() < new Date(semesterEntity.startRegistration).getTime() || now.getTime() > new Date(semesterEntity.endDateRegistration).getTime()) throw new BadRequestException('Không thể đăng ký lớp học này!');
        const studentEntity = new Student();
        studentEntity.id = userId;

        const isEnrolled = await this.enrollmentRepository.findOne({ where: { student: studentEntity, class: classData } });
        if (isEnrolled) throw new BadRequestException('Bạn đã đăng ký lớp học này rồi!');
        await this.enrollmentRepository.save({
            student: studentEntity,
            class: classData,
            semester: semesterEntity,
            isEnrolled: false
        })

        classData.currentStudents += 1;
        await this.classRepository.save(classData);
    }

    async getEnrolledCoursesBySemester(userId: string, semesterId: number): Promise<EnrollmentResponse[]> {
        const enrollments = await this.enrollmentRepository.find({ where: { student: { id: userId }, semester: { id: semesterId } }, relations: ['class'] });
        const response = enrollments.map(enrollment => new EnrollmentResponse(enrollment));
        return response;
    }

    async removeEnrolledCourse(enrollmentId: number, userId: string): Promise<void> {
        //
        const enrollment = await this.enrollmentRepository.findOne({ where: { id: enrollmentId, student: { id: userId } }, relations: ['class'] });
        if (!enrollment) throw new BadRequestException('Bạn chưa đăng ký lớp học này!');
        if (enrollment.isEnrolled) throw new BadRequestException('Không thể hủy đăng ký lớp học này!');

        const classData = enrollment.class;
        if (!classData) throw new BadRequestException('Không tìm thấy lớp học. Vui lòng kiểm tra lại!');
        if (classData.status === ClassStatus.FINISHED) throw new BadRequestException('Lớp học đã được bắt đầu! Không thể hủy đăng ký!');

        const now = new Date();
        if (now.getTime() < new Date(classData.semester.startRegistration).getTime() || now.getTime() > new Date(classData.semester.endDateRegistration).getTime()) throw new BadRequestException('Không thể hủy đăng ký lớp học này!');

        await this.enrollmentRepository.remove(enrollment);
        classData.currentStudents -= 1;
        await this.classRepository.save(classData);
    }
}