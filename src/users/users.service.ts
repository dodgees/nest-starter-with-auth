import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username) {
    let queryBuilder = this.userRepository.createQueryBuilder('users');
    queryBuilder.where('LOWER(users.username) = LOWER(:username)', {
      username,
    });
    return queryBuilder.getOne();
  }

  async create(username: string, password: string) {
    return this.userRepository.save(
      await this.userRepository.create({ username, password }),
    );
  }
}
