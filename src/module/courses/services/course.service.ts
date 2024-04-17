import { Body, HttpStatus, Injectable, Post } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Course } from '../models/course.model';
import { SuccessMessage } from 'src/core/schemas/entities/success.entity';
import { CourseDto } from 'src/core/schemas/dtos/create.dto';
import { UpdateCourseDto } from 'src/core/schemas/dtos/update.dto';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { CategoryDocument } from 'src/module/category/models/category.model';
import { AllCoursesResponse } from 'src/core/schemas/entities/getAll.entity';

export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: mongoose.Model<Course>,
  ) {}

  async createCourse(
    courseDto: CourseDto,
    userId: string,
  ): Promise<CreatedSuccessMessage> {
    const course = await this.courseModel.findOne({
      course: courseDto.courseTitle,
    });
    if (course) {
      throw new ServiceException(
        'Category already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdCourse = new this.courseModel({
      ...courseDto,
      userId: userId,
    });
    const savedCourse = await createdCourse.save();

    return {
      message: 'Course created successfully',
      createdItem: savedCourse.courseTitle,
    };
  }

  async getAllCourses(): Promise<AllCoursesResponse[]> {
    return await this.courseModel
      .find()
      .populate({ path: 'categoryId' })
      .then((allCategory) => {
        return allCategory.map((course) => {
          const courseCategory = course.categoryId as CategoryDocument;
          return <AllCoursesResponse>{
            id: course.id,
            category: courseCategory.category,
            course: course.courseTitle,
            description: course.courseDescription,
          };
        });
      });
  }

  async getSingleCourse(courseId: string): Promise<AllCoursesResponse> {
    return await this.courseModel
      .findOne({ courseId: courseId })
      .then((courseData) => {
        return {
          id: courseData.id,
          category: courseData.categoryId,
          course: courseData.courseTitle,
          description: courseData.courseDescription,
        };
      });
  }
  async editCourse(
    userId: string,
    courseId: string,
    updateCourse: UpdateCourseDto,
  ): Promise<SuccessMessage> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new ServiceException('Course not found', HttpStatus.NOT_FOUND);
    }
    const courseOwner = course.userId;
    if (userId != courseOwner) {
      throw new ServiceException(
        'You cannot edit this course',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.courseModel.findOneAndUpdate(
        { courseId: courseId },
        updateCourse,
      );
    }
    return {
      message: 'course updated successfully',
    };
  }

  async deleteCourse(
    userId: string,
    courseId: string,
  ): Promise<SuccessMessage> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new ServiceException('Course not found', HttpStatus.NOT_FOUND);
    }
    const courseOwner = course.userId;
    if (userId != courseOwner) {
      throw new ServiceException(
        'You cannot delete this course',
        HttpStatus.BAD_REQUEST,
      );
    }
   
    await this.courseModel.deleteOne;
    return {
      message: 'course deleted successfully',
    };
  }
}
