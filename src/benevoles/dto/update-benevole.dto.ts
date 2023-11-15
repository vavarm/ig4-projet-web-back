import { PartialType } from '@nestjs/mapped-types';
import { CreateBenevoleDto } from './create-benevole.dto';

export class UpdateBenevoleDto extends PartialType(CreateBenevoleDto) {}
