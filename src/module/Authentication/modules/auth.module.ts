import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../controllers/auth.controller';
import { JwtStrategy } from 'src/core/strategies/jwt.strategy';
import jwtConstants from 'src/core/config/constants';
import { GoogleStrategy } from 'src/core/strategies/google.strategy';
import { AuthService } from '../Services/auth.service';
import { Auth, AuthSchema } from '../model/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),

    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
//   exports: [AuthService],
})
export class AuthModule {}
