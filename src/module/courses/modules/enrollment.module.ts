
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Enrolled, EnrolledSchema } from '../models/enrollment.model';
import { EnrolledController } from '../controllers/enrollment.controller';
import { EnrolledService } from '../services/enrollment.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: Enrolled.name, schema: EnrolledSchema }]),

  ],
  controllers: [EnrolledController],
  providers: [EnrolledService ],
})
export class EnrolledModule {}

