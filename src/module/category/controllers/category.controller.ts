import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { AdminAuthGuard } from 'src/core/guards/admin.guard';
import { SuccessMessage } from 'src/core/schemas/entities/success.entity';
import { CategoryDto } from 'src/core/schemas/dtos/create.dto';
import { UpdateCategoryDto } from 'src/core/schemas/dtos/update.dto';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { AllCategoriesResponse } from 'src/core/schemas/entities/getAll.entity';

@ApiTags('category')
@Controller('')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AdminAuthGuard)
  @Post('')
  async createCategory(
    @Body() categoryDto: CategoryDto,
  ): Promise<CreatedSuccessMessage> {
    return await this.categoryService
      .createCategory(categoryDto)
      .catch((error) => {
        throw new HttpException(error.message, error.statusCode ?? 400);
      });
  }

  @Get('')
  async getAllCategories(): Promise<AllCategoriesResponse[]> {
    return await this.categoryService.getAllCategories().catch((error) => {
      throw new HttpException(error.message, error.statusCode ?? 400);
    });
  }

  @UseGuards(AdminAuthGuard)
  @Put(':id')
  async editCategory(
    @Param('id') id: string,
    @Body() updateCategory: UpdateCategoryDto,
  ): Promise<SuccessMessage> {
    return await this.categoryService
      .editCategory(id, updateCategory)
      .catch((error) => {
        throw new HttpException(error.message, error.statusCode ?? 400);
      });
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async deleteCategory(
    @Param('id') id: string,
  ): Promise<SuccessMessage> {
    return await this.categoryService.deleteCategory(id).catch((error) => {
      throw new HttpException(error.message, error.statusCode ?? 400);
    });
  }
}
