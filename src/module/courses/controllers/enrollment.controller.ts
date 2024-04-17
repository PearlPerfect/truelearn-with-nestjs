import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnrolledService } from '../services/enrollment.service';
import { UserAuthGuard } from 'src/core/guards/user.guard';

@ApiTags('enrollment')
@Controller('')
export class EnrolledController {
  constructor(private enrolledService: EnrolledService) {}

  @UseGuards(UserAuthGuard)
  @Post('/:id')
  async enroll(@Request() req, @Param('id') courseId) {
    const userId = req.user.id;
    this.enrolledService.createUserCourse(userId, courseId);
  }
  @Get('/:id')
  async getUserEnrollment(@Request() req,
@Param('id') courseId) {
    const userId = req.user.id;
    return this.enrolledService.getUserEnrollment(userId, courseId);
  }
}
