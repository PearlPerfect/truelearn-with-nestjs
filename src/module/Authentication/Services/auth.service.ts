import { HttpStatus, Injectable } from '@nestjs/common';
import {
  AuthResponse,
  AuthUser,
  GoogleAuthResponse,
} from '../../../core/schemas/entities/auth.entity';
import { ServiceException } from 'src/core/exceptions/service.exception';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../../../core/schemas/dtos/login.dto';
import { User } from 'src/module/user/models/user.model';
import { AuthDocument } from '../model/auth.model';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: mongoose.Model<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async googleLogin(req): Promise<GoogleAuthResponse> {
    const userData = req.user;
    if (!userData) {
      throw new ServiceException(
        'Invalid Login Credentials: Re-enter a valid Email',
        HttpStatus.BAD_REQUEST,
      );
    }
    const response: GoogleAuthResponse = {
      message: 'Google Login Successfully',
      email: userData.emails[0],
      fullName: userData.firstName + ' ' + userData.lastName,
      image: userData.image,
      accessToken: userData.accessToken,
    };
    return response;
  }
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.authModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new ServiceException(
        'Invalid Login Credentials: Re-enter a valid Email',
        HttpStatus.BAD_REQUEST,
      );
    }
    const correctPassword = bcrypt.compare(loginDto.password, user.password);
    if (!correctPassword) {
      throw new ServiceException(
        'Invalid Login Credentials:Check your password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.signUser(user);
  }
  async signUser(user: AuthDocument): Promise<AuthResponse> {
    const payload: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    user.refreshToken = await this.hashRefreshToken(refreshToken);
    await user.save();

    return {
      ...payload,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  private async hashRefreshToken(refreshToken: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(refreshToken, salt);
  }
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const decoded = this.jwtService.decode(refreshToken);
    if (!decoded) {
      throw new ServiceException(
        'Invalid refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.authModel.findById(decoded.id);
    if (!user) {
      throw new ServiceException('Invalid userId', HttpStatus.BAD_REQUEST);
    }
    const validRefreshToken = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    const newPayload: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
    const newAccessToken = this.jwtService.sign(newPayload, {
      expiresIn: '15m',
    });

    return {
      ...newPayload,
      accessToken: newAccessToken,
      refreshToken: user.refreshToken,
    };
  }
}
