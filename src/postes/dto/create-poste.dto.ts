import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

export class CreatePosteDto {
    @IsBoolean()
    @IsNotEmpty()
    createDefaultEspace: boolean

    @IsNumber()
    nbPlacesForDefaultEspace: number

    @IsNotEmpty()
    nom: string

    @IsNotEmpty()
    @IsNumber()
    festivalYear: number
}