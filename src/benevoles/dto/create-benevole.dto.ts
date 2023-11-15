import { IsArray, IsNotEmpty, IsString, MinLength, IsBoolean } from 'class-validator'
import { EnumTailleTShirt, EnumHebergement, EnumRole } from '@prisma/client'

export class CreateBenevoleDto {
    @IsNotEmpty()
    @IsString()
    nom: string

    @IsNotEmpty()
    @IsString()
    prenom: string

    @IsNotEmpty()
    @IsString()
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

    taille_tshirt: EnumTailleTShirt

    @IsBoolean()
    vegetarien: boolean

    hebergement: EnumHebergement

    role: EnumRole

    @IsBoolean()
    compteValide: boolean
}
