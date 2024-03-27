
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from '../models/teachers.model';
import { TeacherService } from '../Services/teacher.service';
import { TeacherController } from '../controllers/teacher.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),

  ],
  controllers: [TeacherController],
  providers: [TeacherService ],
})
export class TeacherModule {}

