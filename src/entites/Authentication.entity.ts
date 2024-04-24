import { BeforeInsert, Column, Entity } from 'typeorm';
import { AuthenticationType } from 'src/interfaces/auth.interface';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'authentications' })
export class Authentication {
  @Column({ name: 'username', primary: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'type', enum: AuthenticationType, type: 'enum', default: AuthenticationType.STUDENT })
  type: AuthenticationType;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
