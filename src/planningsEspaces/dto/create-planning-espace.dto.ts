import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreatePlanningEspaceDto {
    @IsNumber()
    @IsNotEmpty()
    espaceId: number

    @IsNumber()
    @IsNotEmpty()
    benevoleId: number

    @IsNumber()
    @IsNotEmpty()
    creneauHoraireId: number
}