import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryDocument } from 'src/module/category/models/category.model';
import { TopicDocument } from 'src/module/courses/models/topic.model';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly category: string;
}

export class CourseDto {
  @IsNotEmpty()
  categoryId: string | CategoryDocument;
  @IsNotEmpty()
  @IsString()
  courseTitle: string;
  @IsNotEmpty()
  @IsString()
  courseDescription: string;
}

export class TopicDto {
  @IsNotEmpty()
  @IsString()
  topic: string;
  @IsNotEmpty()
  @IsString()
  topicIntroduction: string;
}

export class MaterialDto {
  @IsNotEmpty()
  @IsString()
  nameOfMaterial: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  url: string;
}
