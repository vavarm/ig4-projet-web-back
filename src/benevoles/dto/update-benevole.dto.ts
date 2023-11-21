import { PartialType } from '@nestjs/mapped-types';
import { CreateBenevoleDto } from './create-benevole.dto';
import { Exclude } from 'class-transformer'

export class UpdateBenevoleDto extends PartialType(CreateBenevoleDto) {
    @Exclude()
    email: string
}
