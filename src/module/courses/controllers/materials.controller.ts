import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MaterialService } from '../services/material.service';
import { MaterialDto } from 'src/core/schemas/dtos/create.dto';
import { InstructorAuthGuard } from 'src/core/guards/instructor.guard';
import { CreatedSuccessMessage } from 'src/core/schemas/entities/create.entity';
import { AllTopicMaterialsResponse } from 'src/core/schemas/entities/getAll.entity';
import { UpdateMaterialDto } from 'src/core/schemas/dtos/update.dto';

@ApiTags('materials')
@Controller('')
export class MaterialsController {
  constructor(private materialService: MaterialService) {}

  @UseGuards(InstructorAuthGuard)
  @Post('/:id/materials')
  async createMaterial(
    @Request() req,
    @Param('id') topicId: string,
    @Body() materialDto: MaterialDto,
  ): Promise<CreatedSuccessMessage> {
    const userId = req.user.id;
    return this.materialService
      .createMaterial(userId, topicId, materialDto)
      .catch((error) => {
        throw new HttpException(error.message, error.statusCode ?? 400);
      });
  }

  @Get('/:id/materials')
  async getAllTopicMaterials(
    @Param('id')
    topicId: string,
  ): Promise<AllTopicMaterialsResponse[]> {
    return this.materialService.getAllTopicMaterials(topicId);
  }

  @UseGuards(InstructorAuthGuard)
  @Put('/:id/material/:materialId/')
  async editMaterial(
    @Param('id')
    topicId: string,
    @Param('materialId')
    materialId: string,
    @Request() req,
    @Body() materialDto: UpdateMaterialDto
  ) {
    const userId = req.user.id;
    return this.materialService.editMaterial(userId, topicId, materialId, materialDto);
  }
  @UseGuards(InstructorAuthGuard)
  @Delete('/:id/material/:materialId/')
  async deleteMaterial(
    @Param('id')
    topicId: string,
    @Param('materialId')
    materialId: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.materialService.deleteMaterial(userId, materialId,topicId,);
  }
}
