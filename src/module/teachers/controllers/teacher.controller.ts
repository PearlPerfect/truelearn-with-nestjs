import {
    Controller,
    Get,
    UseGuards,
    Req,
    Post,
    Body,
    HttpException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiTags } from '@nestjs/swagger';
import { TeacherService } from '../Services/teacher.service';
  
  
  @ApiTags('instructors')
  @Controller('')
  export class TeacherController {
    constructor(private teacherService: TeacherService) {}
  
   
  }
  