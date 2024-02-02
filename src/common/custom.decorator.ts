import { SetMetadata } from '@nestjs/common'
import { EnumRole } from '@prisma/client'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: EnumRole[]) => SetMetadata(ROLES_KEY, roles)