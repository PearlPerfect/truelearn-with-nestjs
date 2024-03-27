import { Injectable } from '@nestjs/common';
import { PassportStrategy} from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth2';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
   const user ={
    emails: [emails[0].value],
    firstName :name.givenName,
    lastName: name.familyName,
    image: photos[0].value,
    accessToken
   }
    return done(null, user);
  }
}