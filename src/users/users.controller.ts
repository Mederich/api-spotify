import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly UsersService:UsersService){}

}
