import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { AuthDocument } from 'src/module/Authentication/model/auth.model';
import { CourseDocument } from 'src/module/courses/models/course.model';

export type EnrolledDocument = HydratedDocument<Enrolled>;

@Schema()
export class Enrolled {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string | AuthDocument;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Course', required: true })
  courseId: string | CourseDocument;
}

export const EnrolledSchema = SchemaFactory.createForClass(Enrolled);
