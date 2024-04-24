import { Module } from '@nestjs/common';
import { AuthController } from './controllers/Auth.controller';
import { AuthService } from './services/Auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from 'src/entites/Authentication.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authentication]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
