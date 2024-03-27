import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcrypt";
import { HydratedDocument } from "mongoose";


export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
@Prop({ type: String, unique: true })
email: string;
@Prop({ required: true })
password: string;
@Prop()
refreshToken: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
AuthSchema.pre<Auth>('save', async function (next: Function) {
    this.password = await hash(this.password, 8);
    next();
  });