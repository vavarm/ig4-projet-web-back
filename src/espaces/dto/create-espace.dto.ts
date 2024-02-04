import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateEspaceDto {
    @IsNotEmpty()
    nom: string

    @IsNumber()
    @IsNotEmpty()
    nbPlacesMax: number

    @IsNumber()
    @IsNotEmpty()
    posteId: number
}
