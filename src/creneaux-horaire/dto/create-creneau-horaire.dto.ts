import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateCreneauHoraireDto {
    @IsNumber()
    @IsNotEmpty()
    horaireDebutHeures: number

    @IsNumber()
    @IsNotEmpty()
    horaireDebutMinutes: number

    @IsNumber()
    @IsNotEmpty()
    horaireFinHeures: number

    @IsNumber()
    @IsNotEmpty()
    horaireFinMinutes: number

    @IsNumber()
    @IsNotEmpty()
    jourId: number
}