import { TeacherDocument } from "src/module/teachers/models/teachers.model";
import { UserDocument } from "src/module/user/models/user.model";


export class AuthUser {
  id: string | TeacherDocument | UserDocument;
  fullName: string;
  email: string;
}
export class UpdatedUserResponse {
  message: string;
}
export class AuthResponse extends AuthUser {
  accessToken: string | Promise<string>;
  refreshToken: string;
}

export class GoogleAuthResponse{
    message: string;
    email: string;
    fullName: string;
    image: string;
    accessToken: string
}
