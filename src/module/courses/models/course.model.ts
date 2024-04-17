import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AuthDocument } from 'src/module/authentication/model/auth.model';
import { CategoryDocument } from 'src/module/category/models/category.model';

export type CourseDocument = HydratedDocument<Course>;
@Schema({ timestamps: true })
export class Course {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string | AuthDocument;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  categoryId: string | CategoryDocument;
  @Prop({ required: true })
  courseTitle: string;
  @Prop({ required: true })
  courseDescription: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
