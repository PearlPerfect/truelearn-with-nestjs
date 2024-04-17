import { AuthDocument } from "src/module/Authentication/model/auth.model";
import { Role } from "../enum/auth.enum";


export class AuthUser {
  id: string | AuthDocument;
  fullName: string;
  email: string;
  role: Role;
}
export class UpdatedUserResponse {
  message: string;
}
export class AuthResponse extends AuthUser {
  accessToken: string | Promise<string>;
  refreshToken: string;
}

export class GoogleAuthResponse {
  message: string;
  email: string;
  fullName: string;
  image: string;
  accessToken: string;
}


