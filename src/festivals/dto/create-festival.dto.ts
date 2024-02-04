import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateFestivalDto {
    @IsNumber()
    @IsNotEmpty()
    year: number
}