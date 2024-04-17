import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { Gender, Role } from 'src/core/schemas/enum/auth.enum';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({timestamps: true})
export class Auth {
  @Prop({ type: String, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  refreshToken: string;
  @Prop()
  fullName: string;
  @Prop()
  phoneNumber: string;
  @Prop({ enum: Gender })
  gender: Gender;
  @Prop({ enum: Role, default: Role.USER })
  role: Role;
  @Prop()
  profilePicture: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
AuthSchema.pre<Auth>('save', async function (next: Function) {
  this.password = await hash(this.password, 8);
  next();
});
