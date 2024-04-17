import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { TopicDocument } from './topic.model';

export type MaterialDocument = HydratedDocument<Material>;
@Schema()
export class Material {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  topicId: string |TopicDocument;
  @Prop()
  nameOfMaterial: string;
  @Prop()
  description: string;
  @Prop()
  url: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
