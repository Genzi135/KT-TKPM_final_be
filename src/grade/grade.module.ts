import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from 'src/entites/Grade.entity';
import { Student } from 'src/entites/Student.entity';
import { GradeController } from './controllers/Grade.controller';
import { GradeService } from './services/GradeService.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Student]), JwtModule],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
