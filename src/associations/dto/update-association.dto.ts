import { PartialType } from '@nestjs/mapped-types'
import { CreateAssociationDto } from './create-association.dto'
import { Exclude } from 'class-transformer'

export class UpdateAssociationDto extends PartialType(CreateAssociationDto) {
    @Exclude()
    nom: string
}
