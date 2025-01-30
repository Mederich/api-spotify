
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(userId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ userId:userId });
  }
  async remove(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }
  async createUser(user: { username: string; password: string }): Promise<void> {
    // Implémentation pour sauvegarder l'utilisateur dans la base de données
    await this.usersRepository.save(user); // Utilise TypeORM
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
}
