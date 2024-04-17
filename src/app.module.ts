import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './module/Authentication/controllers/auth.controller';
import { AuthService } from './module/authentication/services/auth.service';
import { GoogleStrategy } from './core/strategies/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import routes from './route';
import { AuthModule } from './module/Authentication/modules/auth.module';
import { ContactModule } from './module/contact/modules/contact.module';
import { CategoryModule } from './module/category/modules/category.module';
import { CourseModule } from './module/courses/modules/course.module';
import { TopicModule } from './module/courses/modules/topic.module';
import { MaterialModule } from './module/courses/modules/material.module';
import { UserModule } from './module/user/modules/user.module';
import { EnrolledModule } from './module/courses/modules/enrollment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODBURI),
    AuthModule,
    CategoryModule,
    ContactModule,
    CourseModule,
    EnrolledModule,
    MaterialModule,
    TopicModule,
    UserModule,
    routes,
  ],
})
export class AppModule {}
