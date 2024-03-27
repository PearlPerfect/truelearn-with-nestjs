import { AuthDocument } from '../../models/auth.model';

export class AuthUser {
  id: string | AuthDocument;
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
