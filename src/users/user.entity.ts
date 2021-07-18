import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth/roles/role.enum';
const bcrypt = require('bcrypt');

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('simple-enum', { enum: Role, array: true })
  roles: Role[] = [Role.USER];

  @BeforeInsert()
  async hashPassword() {
    const password = await bcrypt.hashSync(this.password, 10);
    this.password = password;
  }
}
