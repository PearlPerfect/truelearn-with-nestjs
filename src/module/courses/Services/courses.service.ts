import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/module/user/models/user.model';
import { Course } from '../models/course.model';
@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: mongoose.Model<Course>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
 
}
