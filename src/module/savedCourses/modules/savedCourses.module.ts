
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from '../models/savedCourses.model';
import { FavoriteController } from '../controllers/savedCourse.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),

  ],
  controllers: [FavoriteController],
  providers: [TeacherService ],
})
export class TeacherModule {}

