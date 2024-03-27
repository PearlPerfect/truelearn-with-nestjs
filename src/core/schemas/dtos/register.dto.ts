
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from '../enum/auth.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly fullName: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly phoneNumber: string;
  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;
}


