import { HttpStatus, Injectable } from '@nestjs/common';
import {
  AuthResponse,
  AuthUser,
  GoogleAuthResponse,
} from '../../../core/schemas/entities/auth.entity';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../../core/schemas/dtos/register.dto';
import { Teacher } from '../models/teachers.model';
import { IUser } from 'src/core/schemas/interfaces/auth.interface';
import { Auth } from 'src/module/Authentication/model/auth.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(Teacher.name) private teacherModel: mongoose.Model<Teacher>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthUser> {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const subject = 'Welcome to TrueLearn App!';
    const emailTemplate = 'email-template.ejs';
    const userPassword =
      createUserDto.email.split('@')[0] + Math.floor(10 + Math.random() * 5);
    const { email, password, ...userDto } = createUserDto;

    return await this.authModel
      .findOne({ email: createUserDto.email })
      .then(async (user) => {
        if (user) {
          throw new ServiceException(
            'Email already in use, try another one',
            HttpStatus.BAD_REQUEST,
          );
        }
        const newAuthModel = new this.authModel({ email, password});
        const newUser = await newAuthModel.save();

        const newUserData: IUser = {
          userId: newUser._id,
          ...userDto,
        };
        const newTeacherModel = new this.teacherModel(newUserData);
        const newTeacher = await newTeacherModel.save();

        const response: AuthUser = {
          id: newUser.id,
          fullName: newTeacher.fullName,
          email: newUser.email,
        };
        // await this.emailService.sendEmail(newUserData, token, subject, emailTemplate);
        return response;
      });
  }

}
