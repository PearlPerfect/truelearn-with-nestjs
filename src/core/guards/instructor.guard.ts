import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../schemas/entities/auth.entity';
import { Role } from '../schemas/enum/auth.enum';
@Injectable()
export class InstructorAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resp = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser;
    return resp && user.role == Role.INSTRUCTOR
  }
}
