
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import jwtConstants from '../config/constants';
import { AuthResponse } from 'src/module/Authentication/schemas/entities/auth.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AuthResponse) {
    return {
      id: payload.id,
      name: payload.fullName,
      email: payload.email,
    };
  }
}
