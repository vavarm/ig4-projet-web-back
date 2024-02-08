import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateJeuDto {
    @IsNotEmpty()
    @IsNumber()
    idJeu: number

    @IsNotEmpty()
    nom: string

    @IsNotEmpty()
    auteur: string

    @IsNotEmpty()
    editeur: string

    @IsNotEmpty()
    nbJoueurs: string

    @IsNotEmpty()
    ageMin: string

    @IsNotEmpty()
    duree: string

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    notice: string

    @IsNotEmpty()
    mecanismes: string

    @IsNotEmpty()
    themes: string

    @IsNotEmpty()
    tags: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    logo: string

    @IsNotEmpty()
    video: string
}