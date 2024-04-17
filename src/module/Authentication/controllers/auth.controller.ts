import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import {
  AuthResponse,
  GoogleAuthResponse,
} from '../../../core/schemas/entities/auth.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../../core/schemas/dtos/login.dto';
import { CreateUserDto } from 'src/core/schemas/dtos/register.dto';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() DTO: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(DTO).catch((err) => {
      throw new HttpException(err.message, err.statusCode ?? 400);
    });
  }
  @Post('login')
  async login(@Body() DTO: LoginDto): Promise<AuthResponse> {
    return this.authService.login(DTO).catch((err) => {
      throw new HttpException(err.message, err.statusCode ?? 400);
    });
  }
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(@Req() req): Promise<GoogleAuthResponse> {
    return this.authService.googleLogin(req);
  }
}
