import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/Student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entites/Student.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [TypeOrmModule.forFeature([Student]), JwtModule],
  exports: [],
})
export class UserModule {}
