import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;
@Schema()
export class Course {
  @Prop({type: SchemaTypes.ObjectId, ref: 'Category',required: true})
  category: string;
  @Prop({required: true})
  specialty: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
