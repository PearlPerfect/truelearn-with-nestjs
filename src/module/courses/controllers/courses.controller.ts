import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
  Get,
  Request,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '../services/course.service';
import { AdminAuthGuard } from 'src/core/guards/admin.guard';
import { SuccessMessage } from 'src/core/schemas/entities/success.entity';
import { CourseDto } from 'src/core/schemas/dtos/create.dto';
import { UpdateCourseDto } from 'src/core/schemas/dtos/update.dto';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { AllCoursesResponse } from 'src/core/schemas/entities/getAll.entity';
import { InstructorAuthGuard } from 'src/core/guards/instructor.guard';

@ApiTags('course')
@Controller('')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @UseGuards(InstructorAuthGuard)
  @Post('')
  async createCategory(
    @Request() req,
    @Body() courseDto: CourseDto,
  ): Promise<CreatedSuccessMessage> {
    const userId = req.user.id;
    return await this.courseService
      .createCourse(courseDto, userId)
      .catch((error) => {
        throw new HttpException(error.message, error.statusCode ?? 400);
      });
  }

  @Get('')
  async getAllCategories(): Promise<AllCoursesResponse[]> {
    return await this.courseService.getAllCourses().catch((error) => {
      throw new HttpException(error.message, error.statusCode ?? 400);
    });
  }

  @Get(':id')
  async getSingleCourse(
    @Param('id') courseId: string,
  ): Promise<AllCoursesResponse> {
    return await this.courseService.getSingleCourse(courseId).catch((error) => {
      throw new HttpException(error.message, error.statusCode ?? 400);
    });
  }

  @UseGuards(InstructorAuthGuard)
  @Put(':id')
  async editCourse(
    @Param('id') courseId: string,
    @Request() req,
    @Body() updateCourse: UpdateCourseDto,
  ): Promise<SuccessMessage> {
    const userId = req.user.Id;
    return await this.courseService
      .editCourse(courseId, userId, updateCourse)
      .catch((error) => {
        throw new HttpException(error.message, error.statusCode ?? 400);
      });
  }

  @UseGuards(InstructorAuthGuard)
  @Delete(':id')
  async deleteCourse(
    @Param('id') courseId: string,
    @Request() req,
  ): Promise<SuccessMessage> {
    const userId = req.user.id;
    return await this.courseService
      .deleteCourse(userId, courseId)
      .catch((error) => {
        throw new HttpException(error.message, error.statusCode ?? 400);
      });
  }
}
