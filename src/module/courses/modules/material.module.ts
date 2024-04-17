import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from '../models/topic.model';
import { Material, MaterialSchema } from '../models/material.model';
import { MaterialsController } from '../controllers/materials.controller';
import { MaterialService } from '../services/material.service';
import { Course, CourseSchema } from '../models/course.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema },
      { name: Topic.name, schema: TopicSchema },,
      { name: Course.name, schema: CourseSchema }
    ]),
  ],
  controllers: [MaterialsController],
  providers: [MaterialService],
})
export class MaterialModule {}
