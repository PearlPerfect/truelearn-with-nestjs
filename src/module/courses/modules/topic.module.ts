import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicController } from '../controllers/topic.controller';
import { Topic, TopicSchema } from '../models/topic.model';
import { TopicService } from '../services/topic.services';
import { Course, CourseSchema } from '../models/course.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema },
      { name: Course.name, schema: CourseSchema }
    ]),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
