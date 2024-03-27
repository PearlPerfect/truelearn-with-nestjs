
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
  userId: string
  @Prop({type: SchemaTypes.ObjectId, ref: 'Blog', required: true })
  PostId: string;
  @Prop({ required: true })
  blogContent: string;
 
}

export const CommentSchema = SchemaFactory.createForClass(Comment);


