
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { hash } from 'bcrypt';
import { AuthDocument } from 'src/module/Authentication/model/auth.model';
import { Gender, Role } from 'src/core/schemas/enum/auth.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string | AuthDocument
  @Prop()
  fullName: string;
  @Prop()
  phoneNumber: string;
  @Prop({ enum: Gender })
  gender: Gender;
  @Prop({ enum: Role, default: Role.USER })
  role: Role;
  @Prop({ default: true })
  isActive: boolean;
  
}

export const UserSchema = SchemaFactory.createForClass(User);

