import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdateEspaceDto {
    @IsNotEmpty()
    nom: string

    @IsNumber()
    @IsNotEmpty()
    nbPlaces: number
}
