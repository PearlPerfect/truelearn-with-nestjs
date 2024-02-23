
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string
  @Prop({ required: true })
  blogTitle: string;
  @Prop({ required: true })
  blogContent: string;
 
}

export const BlogSchema = SchemaFactory.createForClass(Blog);


