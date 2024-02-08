import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateEspaceJeuDto {
    @IsNotEmpty()
    @IsNumber()
    jeuId: number

    @IsNotEmpty()
    @IsNumber()
    espaceId: number

    @IsNotEmpty()
    aAnimer: string

    @IsNotEmpty()
    recu: string
}