import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { EnumRole } from '@prisma/client'

@Injectable()
export class BenevolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const { user, body, params } = context.switchToHttp().getRequest()


        return user.role == EnumRole.Admin || user.id == body.id || user.id == params.id
    }
}