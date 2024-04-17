import { AuthDocument } from "src/module/authentication/model/auth.model";
import { Gender } from "../enum/auth.enum";

export interface IUser {
    userId: string | AuthDocument
    fullName: string;
    phoneNumber: string;
    gender: Gender;
  }