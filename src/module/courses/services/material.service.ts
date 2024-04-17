import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Material } from '../models/material.model';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { MaterialDto } from 'src/core/schemas/dtos/create.dto';
import { Topic, TopicDocument } from '../models/topic.model';
import { Course, CourseDocument } from '../models/course.model';
import {
  AllCourseTopicResponse,
  AllTopicMaterialsResponse,
} from 'src/core/schemas/entities/getAll.entity';
import { SuccessMessage } from 'src/core/schemas/entities/success.entity';
import { UpdateMaterialDto } from 'src/core/schemas/dtos/update.dto';
@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private materialModel: mongoose.Model<Material>,
    @InjectModel(Topic.name) private topicModel: mongoose.Model<Topic>,
    @InjectModel(Course.name) private courseModel: mongoose.Model<Course>,
  ) {}
  async createMaterial(
    userId: string,
    topicId: string,
    dto: MaterialDto,
  ): Promise<CreatedSuccessMessage> {
    const topic = await this.topicModel.findById(topicId);
    if (!topic) {
      throw new ServiceException('Topic not found', HttpStatus.NOT_FOUND);
    }
    const courseId = topic.courseId;
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
    }

    const newMaterial = new this.materialModel({ topicId, ...dto });
    const savedMaterial = await newMaterial.save();

    return {
      message: 'Topic created successfully',
      createdItem: savedMaterial.nameOfMaterial,
    };
  }

  async getAllTopicMaterials(
    topicId: string,
  ): Promise<AllTopicMaterialsResponse[]> {
    return await this.materialModel
      .find({ topicId: topicId })
      .populate({ path: 'topicId', model: 'Topic' })
      .then((allTopics) => {
        console.log(allTopics);
        return allTopics.map((eachMaterial) => {
          return <AllTopicMaterialsResponse>{
            id: eachMaterial.id,
            topic: (eachMaterial.topicId as TopicDocument).topic,
            nameOfMaterial: eachMaterial.nameOfMaterial,
            description: eachMaterial.description,
            url: eachMaterial.url,
          };
        });
      });
  }

  async getSingleMaterial() {}
  async editMaterial(
    userId: string,
    topicId: string,
    materialId: string,
    updateDto: UpdateMaterialDto,
  ) : Promise<SuccessMessage>{

    const material = await this.materialModel.findById(materialId).populate({
      path: 'topicId',
      model: 'Topic',
      populate: { path: 'courseId', model: 'Course' },
    });
    const topic = material.topicId as TopicDocument;
    const course = topic.courseId as CourseDocument;
    if (topic.id != topicId) {
      throw new ServiceException('Topic not found', HttpStatus.NOT_FOUND);
    }
    if(course.userId != userId){
      throw new ServiceException('You are not authorized to edit this resource', HttpStatus.NOT_FOUND);
    }
  
    if (!material) {
      throw new ServiceException('Material not found', HttpStatus.NOT_FOUND);
    }


    await this.materialModel.findByIdAndUpdate(materialId, updateDto);
    return {
      message: `material updated successfully`,
    };
  }

  async deleteMaterial(    userId:string,
    materialId: string,
    topicId: string,): Promise<SuccessMessage> {
   
    const material = await this.materialModel.findById(materialId).populate({
      path: 'topicId',
      model: 'Topic',
      populate: { path: 'courseId', model: 'Course' },
    });

    const topic = material.topicId as TopicDocument;
    const course = topic.courseId as CourseDocument;

    if (topic.id != topicId) {
      throw new ServiceException('Topic not found', HttpStatus.NOT_FOUND);
    }
    if(course.userId != userId){
      throw new ServiceException('You are not authorized to edit this resource', HttpStatus.NOT_FOUND);
    }
  
    if (!material) {
      throw new ServiceException('Material not found', HttpStatus.NOT_FOUND);
    }
 
  await this.materialModel.deleteOne( { topicId : topicId } )
    return {
      message: 'Topic deleted successfully',
    };
  }
}
