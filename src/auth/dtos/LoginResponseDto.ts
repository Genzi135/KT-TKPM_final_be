import { Student } from "src/entites/Student.entity";
import { Teacher } from "src/entites/Teacher.entity";

export class LoginResponseDto {
  token: string;
  user: Student | Teacher;
  
  constructor({token, user}: {token: string, user: Student | Teacher}) {
    this.token = token;
    this.user = user;
  }
}
