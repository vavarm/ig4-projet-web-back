import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateEspaceDto {
    @IsNotEmpty()
    nom: string

    @IsNumber()
    @IsNotEmpty()
    nbPlaces: number

    @IsNumber()
    @IsNotEmpty()
    posteId: number
}
