import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
@Schema({timestamps: true})
export class Category {
  @Prop({required: true})
  category: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
