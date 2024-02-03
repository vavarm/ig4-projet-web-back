import { IsArray, IsNotEmpty, IsString, MinLength, IsBoolean, IsEmail, IsEnum } from 'class-validator'
import { EnumTailleTShirt, EnumHebergement, EnumRole } from '@prisma/client'
import { AssociationEntity } from 'src/associations/entities/association.entity'

export class CreateBenevoleDto {
    @IsNotEmpty()
    @IsString()
    nom: string

    @IsNotEmpty()
    @IsString()
    prenom: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsString()
    adressePostale: string

    @IsNotEmpty()
    @IsString()
    codePostal: string

    @IsNotEmpty()
    @IsString()
    ville: string

    @IsNotEmpty()
    @IsString()
    telephone: string

    @IsEnum(EnumTailleTShirt)
    taille_tshirt: EnumTailleTShirt

    @IsBoolean()
    vegetarien: boolean

    @IsEnum(EnumHebergement)
    hebergement: EnumHebergement

    @IsEnum(EnumRole)
    role: EnumRole

    @IsArray()
    associations: AssociationEntity[]
}
