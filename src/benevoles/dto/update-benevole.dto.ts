import { PartialType } from '@nestjs/mapped-types'
import { CreateBenevoleDto } from './create-benevole.dto'
import { Exclude } from 'class-transformer'
import { EnumRole } from '@prisma/client'

export class UpdateBenevoleDto extends PartialType(CreateBenevoleDto) {
    @Exclude()
    email: string
    @Exclude()
    role: EnumRole
    @Exclude()
    compteValide: boolean
    @Exclude()
    present: boolean
}
