import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreatePosteDto {
    @IsNotEmpty()
    nom: string

    @IsNotEmpty()
    @IsNumber()
    festivalYear: number
}