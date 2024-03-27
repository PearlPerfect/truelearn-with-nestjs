import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './module/Authentication/controllers/auth.controller';
import { AuthService } from './module/Authentication/Services/auth.service';
import { GoogleStrategy } from './core/strategies/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import routes from './route';
import { AuthModule } from './module/Authentication/modules/auth.module';
import { ContactModule } from './module/contact/modules/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODBURI,),
    AuthModule,
    ContactModule,
    routes
  ],
})
export class AppModule {}
