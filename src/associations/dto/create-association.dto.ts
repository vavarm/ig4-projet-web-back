import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class CreateAssociationDto {
    @IsNotEmpty()
    @IsString()
    nom: string

    @IsNotEmpty()
    @IsEmail()
    email: string
}
