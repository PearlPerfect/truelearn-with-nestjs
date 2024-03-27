
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Enrolled, EnrolledSchema } from '../models/enrollment.model';
@Module({
  imports: [MongooseModule.forFeature([{ name: Enrolled.name, schema: EnrolledSchema }]),

  ],
  controllers: [],
  providers: [ ],
})
export class EnrolledModule {}

