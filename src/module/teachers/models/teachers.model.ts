
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { hash } from 'bcrypt';
import { Gender, Role } from '../../../core/schemas/enum/auth.enum';
import { AuthDocument } from 'src/module/Authentication/model/auth.model';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema()
export class Teacher {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string | AuthDocument
  @Prop()
  fullName: string;
  @Prop()
  phoneNumber: string;
  @Prop({ enum: Gender })
  gender: Gender;
  @Prop({ enum: Role, default: Role.INSTRUCTORS })
  role: Role;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);


