import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Topic } from '../models/topic.model';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { TopicDto } from 'src/core/schemas/dtos/create.dto';
import { UpdateTopicDto } from 'src/core/schemas/dtos/update.dto';
import { AllCourseTopicResponse } from 'src/core/schemas/entities/getAll.entity';
import { Course } from '../models/course.model';
import { SuccessMessage } from 'src/core/schemas/entities/success.entity';
@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private topicModel: mongoose.Model<Topic>,
    @InjectModel(Course.name) private courseModel: mongoose.Model<Course>,
  ) {}

  async createTopic(
    userId:string,
    courseId: string,
    topicDto: TopicDto,
  ): Promise<CreatedSuccessMessage> {
    const addTopicToCourse = await this.courseModel.findById( courseId );
    if (!addTopicToCourse) {
      throw new ServiceException('Course not found', HttpStatus.NOT_FOUND);
    }

    const courseOwner = addTopicToCourse.userId;
    if (userId != courseOwner) {
      throw new ServiceException(
        'You cannot edit this course',
        HttpStatus.BAD_REQUEST,
      );
    }
  
      const newTopic = new this.topicModel({...topicDto,courseId} );
      const savedTopic = await newTopic.save();
  
    
    return {
      message: 'Topic created successfully',
      createdItem: savedTopic.topic,
    };
  }

  async getAllCourseTopic(courseId: string): Promise<AllCourseTopicResponse[]> {
    return await this.topicModel
      .find({ courseId: courseId })
      .then((allTopics) => {
        console.log(allTopics);
        return allTopics.map((eachTopic) => {
          return <AllCourseTopicResponse>{
            id: eachTopic.id,
            course: eachTopic.courseId,
            topic: eachTopic.topic,
            description: eachTopic.description,
          };
        });
      });
  }

  async getSingleTopic(){
    
  }
  async editTopic(
    userId:string,
    courseId: string,
    topicId: string,
    updateDto: UpdateTopicDto,
  ): Promise<SuccessMessage> {
    const topic = await this.topicModel.findById(topicId);
    if (!topic) {
      throw new ServiceException('Topic not found', HttpStatus.NOT_FOUND);
    }

    const course = await this.courseModel.findById( courseId );
    if (!course) {
      throw new ServiceException('Course not found', HttpStatus.NOT_FOUND);
    }
    const  isAuthorizedUser = course.userId
    if (userId != isAuthorizedUser) {
      throw new ServiceException(
        'You cannot edit this topic',
        HttpStatus.BAD_REQUEST,
      );
  }

  await this.topicModel.findByIdAndUpdate(topicId, updateDto)
  return {
    message: `topic ${topicId} has been updated successfully`,
  }

}

  async deleteTopic(    userId:string,
    courseId: string,
    topicId: string,): Promise<SuccessMessage> {
      const topic = await this.topicModel.findById(topicId);
    if (!topic) {
      throw new ServiceException('Topic not found', HttpStatus.NOT_FOUND);
    }
    const course = await this.courseModel.findById( courseId );
    if (!course) {
      throw new ServiceException('Course not found', HttpStatus.NOT_FOUND);
    }
    const  isAuthorizedUser = course.userId
    if (userId != isAuthorizedUser) {
      throw new ServiceException(
        'You cannot edit this topic',
        HttpStatus.BAD_REQUEST,
      );
  }
  await this.topicModel.deleteOne( { _id : topicId } )
    return {
      message: 'Topic deleted successfully',
    };
  }
}
