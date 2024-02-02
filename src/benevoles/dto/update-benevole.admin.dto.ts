import { PartialType } from '@nestjs/mapped-types'
import { CreateBenevoleDto } from './create-benevole.dto'
import { Exclude } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class UpdateBenevoleAdminDto extends PartialType(CreateBenevoleDto) {
    @Exclude()
    email: string

    @IsBoolean()
    compteValide: boolean
}
