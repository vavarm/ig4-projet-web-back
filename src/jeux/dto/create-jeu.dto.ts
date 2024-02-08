import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateJeuDto {
    @IsNotEmpty()
    @IsNumber()
    idJeu: number

    @IsNotEmpty()
    nom: string

    @IsString()
    auteur: string

    @IsString()
    editeur: string

    @IsString()
    nbJoueurs: string

    @IsString()
    ageMin: string

    @IsString()
    duree: string

    @IsString()
    type: string

    @IsString()
    notice: string

    @IsString()
    mecanismes: string

    @IsString()
    themes: string

    @IsString()
    tags: string

    @IsString()
    description: string

    @IsString()
    image: string

    @IsString()
    logo: string

    @IsString()
    video: string
}