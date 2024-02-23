import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;
@Schema()
export class Course {
  @Prop()
  topic: string;
  @Prop()
  subTopic: string;
  @Prop()
  specialty: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
