import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'semesters'})
export class Semester {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'academic_year'})
    academicYear: string;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'start_date', type: 'date'})
    startDate: Date;

    @Column({name: 'end_date', type: 'date'})
    endDate: Date;

    @Column({name: 'start_date_registration', type: 'date'})
    startRegistration: Date;
    
    @Column({name: 'end_date_registration', type: 'date'})
    endDateRegistration: Date;
}