
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { hash } from 'bcrypt';
import { AuthDocument } from 'src/module/authentication/model/auth.model';
import { Gender, Role } from 'src/core/schemas/enum/auth.enum';
import { CourseDocument } from 'src/module/courses/models/course.model';

export type UserCDocument = HydratedDocument<UserCourses>;

@Schema()
export class UserCourses {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string | AuthDocument
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Course', required: true })
  courseId: string | CourseDocument
}

export const UserSchema = SchemaFactory.createForClass(UserCourses);

