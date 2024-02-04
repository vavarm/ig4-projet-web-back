import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateJourDto {
    @IsNotEmpty()
    label: string

    @IsNumber()
    @IsNotEmpty()
    numeroJour: number

    @IsNumber()
    @IsNotEmpty()
    festivalYear: number
}