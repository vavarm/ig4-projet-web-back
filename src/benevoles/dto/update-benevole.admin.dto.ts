import { PartialType } from '@nestjs/mapped-types'
import { CreateBenevoleDto } from './create-benevole.dto'
import { Exclude } from 'class-transformer'

export class UpdateBenevoleAdminDto extends PartialType(CreateBenevoleDto) {
    @Exclude()
    email: string
}
