import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Enrolled } from '../models/enrollment.model';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { CourseDocument } from '../models/course.model';
import { AllEnrolledResponse } from 'src/core/schemas/entities/getAll.entity';

@Injectable()
export class EnrolledService {
  constructor(
    @InjectModel(Enrolled.name) private enrolledModel: mongoose.Model<Enrolled>,
  ) {}

  async createUserCourse(
    userId: string,
    courseId: string,
  )
  // : Promise<CreatedSuccessMessage> 
  {
    const user = await this.enrolledModel.find({
      userId: userId,
    });
    console.log(user)
    // if (user) {
    //   throw new ServiceException(
    //     'You are enrolled for this course',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    // await this.enrolledModel.create(userId, courseId);
    // return {
    //   message: 'Course enrolled successfully',
    //   createdItem: courseId,
    // };
  }

  async getUserEnrollment(userId: string, courseId)
  // Promise<AllEnrolledResponse[]> 
  {
    const userCourses = await this.enrolledModel.find({ userId: userId })
    if(!userCourses){
      console.log("error")
    }
    console.log(userCourses)
    // const course = userCourses.map((item) => item.courseId);
    // console.log(course);
    // return<AllEnrolledResponse> {
    //   userId:userId,
    //   course: courseId,
    // }
  }
}
