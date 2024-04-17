import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { CourseDocument } from './course.model';

export type TopicDocument = HydratedDocument<Topic>;
@Schema()
export class Topic {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Course', required: true })
  courseId: string | CourseDocument;
  @Prop({required:true})
  topic: string;
  @Prop({required:true})
  description: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
