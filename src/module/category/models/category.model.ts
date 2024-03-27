import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { CourseCategory } from '../schemas/enums/category.enum';

export type CategoryDocument = HydratedDocument<Category>;
@Schema()
export class Category {
  @Prop({required: true})
  category: CourseCategory;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
