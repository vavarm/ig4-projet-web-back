import { PartialType } from '@nestjs/mapped-types'
import { CreateInscriptionDto } from './create-inscription.dto'
import { IsBoolean } from 'class-validator'

export class UpdateInscriptionDto extends PartialType(CreateInscriptionDto) {
    @IsBoolean()
    present: boolean
}
