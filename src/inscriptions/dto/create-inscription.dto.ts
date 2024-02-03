import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateInscriptionDto {
    @IsNumber()
    @IsNotEmpty()
    benevoleId: number

    @IsNumber()
    @IsNotEmpty()
    festivalYear: number
}