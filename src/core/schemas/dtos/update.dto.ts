import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { CategoryDocument } from 'src/module/category/models/category.model';
import { Gender } from '../enum/auth.enum';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  readonly fullName?: string;
  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;
  @IsEnum(Gender)
  @IsOptional()
  readonly gender: Gender;
  @IsOptional()
  readonly profilePicture: string | Document;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  readonly category?: string;
}

export class UpdateCourseDto {
  @IsOptional()
  courseCategory?: String | CategoryDocument;
  @IsString()
  @IsOptional()
  courseTitle?: string;
  @IsString()
  @IsOptional()
  courseDescription?: String;
}

export class UpdateTopicDto {
  @IsOptional()
  courseCategory?: String | CategoryDocument;
  @IsString()
  @IsOptional()
  courseTitle?: string;
  @IsString()
  @IsOptional()
  topicIntroduction?: string;
}

export class UpdateMaterialDto {
  @IsString()
  @IsOptional()
  nameOfMaterial: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  url: string;
}
