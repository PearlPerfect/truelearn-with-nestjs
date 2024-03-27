import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Favorite } from '../models/savedCourses.model';
@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: mongoose.Model<Favorite>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
 
}
