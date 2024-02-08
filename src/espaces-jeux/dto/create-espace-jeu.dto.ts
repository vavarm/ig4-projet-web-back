import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateEspaceJeuDto {
    @IsNotEmpty()
    @IsNumber()
    jeuId: number

    @IsNotEmpty()
    @IsNumber()
    espaceId: number

    @IsString()
    aAnimer: string

    @IsString()
    recu: string
}