import { Body, HttpStatus, Injectable, Post } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from '../models/category.model';
import { SuccessMessage } from 'src/core/schemas/entities/success.entity';
import { UpdateCategoryDto } from 'src/core/schemas/dtos/update.dto';
import { CategoryDto } from 'src/core/schemas/dtos/create.dto';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { AllCategoriesResponse } from 'src/core/schemas/entities/getAll.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: mongoose.Model<Category>,
  ) {}

  async createCategory(
    categoryDto: CategoryDto,
  ): Promise<CreatedSuccessMessage> {
    const category = await this.categoryModel.findOne({
      category: categoryDto.category,
    });
    if (category) {
      throw new ServiceException(
        'Category already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newCategory = new this.categoryModel(categoryDto);
    const saveCategory = await newCategory.save();

    return {
      message: 'Category created successfully',
      createdItem: saveCategory.category,
    };
  }

  async getAllCategories(): Promise<AllCategoriesResponse[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async editCategory(
    id: string,
    updateData: UpdateCategoryDto,
  ): Promise<SuccessMessage> {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateData);
    if (!category) {
      throw new ServiceException('Category not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'category updated successfully',
    };
  }

  async deleteCategory(id: string): Promise<SuccessMessage> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new ServiceException('Category not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'category deleted successfully',
    };
  }
}
