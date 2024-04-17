import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Auth } from 'src/module/authentication/model/auth.model';
import { GetProfileResponse } from 'src/core/schemas/entities/profile.entity';
import { CreateUserDto } from 'src/core/schemas/dtos/register.dto';
import { AuthUser } from 'src/core/schemas/entities/auth.entity';
import { IUser } from 'src/core/schemas/interfaces/auth.interface';
import { UpdateProfileDto } from 'src/core/schemas/dtos/update.dto';
import { UserCourses } from '../models/user.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserCourses.name) private userModel: mongoose.Model<UserCourses>,
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
  ) {}
  
 

async getUserProfile(id: string): Promise<any> {
   
  }

  async updateProfileInfo(id: string, updateData: UpdateProfileDto) {
    
  }
}
