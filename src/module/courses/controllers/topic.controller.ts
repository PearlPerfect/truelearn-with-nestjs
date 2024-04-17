import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TopicService } from '../services/topic.services';
import { TopicDto } from 'src/core/schemas/dtos/create.dto';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { InstructorAuthGuard } from 'src/core/guards/instructor.guard';
import { UpdateTopicDto } from 'src/core/schemas/dtos/update.dto';

@ApiTags('topic')
@Controller('')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @UseGuards(InstructorAuthGuard)
  @Post(':id/topic')
  async createTopic(
    @Request() req,
    @Param('id') courseId: string,
    @Body() topicDto: TopicDto,
  ): Promise<CreatedSuccessMessage> {
    const userId = req.user.id;
    return this.topicService
      .createTopic(userId, courseId, topicDto)
      .catch((error) => {
        throw new HttpException(error.message, error.statusCode ?? 400);
      });
  }

  @Get(':id/topic')
  async getAllCourseTopics(@Param('id') courseId: string) {
    return this.topicService.getAllCourseTopic(courseId).catch((error) => {
      throw new HttpException(error.message, error.statusCode ?? 400);
    });
  }

  @Get(':id/topic/:topicId')
  async getSingleTopics(
    @Param('id') courseId: string,
    @Param('topicId') id: string,
  ) {

    return this.topicService.getSingleTopic().catch((error) => {
      throw new HttpException(error.message, error.statusCode ?? 400);
    });
  }

  @UseGuards(InstructorAuthGuard)
  @Put(`:id/topic/:topicId`)
  async updateOneTopic(
    @Request() req,
    @Param('id') courseId: string,
    @Param('topicId') topicId: string,
    @Body() dto: UpdateTopicDto,
  ) {
    const userId = req.user.id;
    return this.topicService.editTopic(userId, courseId, topicId, dto);
  }

  @UseGuards(InstructorAuthGuard)
  @Delete(`:id/topic/:topicId`)
  async deleteTopic(
    @Request() req,
    @Param('id') courseId: string,
    @Param('topicId') topicId: string,
  ) {
    const userId = req.user.id;
    return this.topicService.deleteTopic(userId, courseId, topicId);
  }
}
