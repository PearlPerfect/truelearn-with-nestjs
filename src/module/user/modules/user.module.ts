
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserCourses, UserSchema } from '../models/user.model';
import { Auth, AuthSchema } from 'src/module/Authentication/model/auth.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCourses.name, schema: UserSchema },
    { name: Auth.name, schema: AuthSchema }
  ]),

  ],
  controllers: [UserController],
  providers: [UserService ],
})
export class UserModule {}

