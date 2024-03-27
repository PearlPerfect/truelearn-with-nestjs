import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Enrolled } from '../models/enrollment.model';


@Injectable()
export class EnrolledService {
  constructor(
    @InjectModel(Enrolled.name) private enrolledModel: mongoose.Model<Enrolled>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
 
}
