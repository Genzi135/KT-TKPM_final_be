import { Module } from '@nestjs/common';
import { AuthController } from './controllers/Auth.controller';
import { AuthService } from './services/Auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from 'src/entites/Authentication.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authentication]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE_IN') },
        isGlobal: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
