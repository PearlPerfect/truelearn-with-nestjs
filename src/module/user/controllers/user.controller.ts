import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from 'src/core/schemas/dtos/register.dto';
import { AuthUser } from 'src/core/schemas/entities/auth.entity';

@ApiTags('students')
@Controller('')
export class UserController {
    constructor(private userService: UserService) {}

}
