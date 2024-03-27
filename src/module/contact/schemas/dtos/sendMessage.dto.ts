
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
  } from 'class-validator';

  
  export class SendMessageDto {
    @IsNotEmpty()
    readonly firstName: string;
    @IsNotEmpty()
    readonly lastName: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
    @IsNotEmpty()
    readonly phoneNumber: string;
    @IsNotEmpty()
    @IsString()
    readonly message: string

  }
  
  
  