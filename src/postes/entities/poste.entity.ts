import { Poste, Espace } from '@prisma/client'
import { BenevoleEntity } from 'src/benevoles/entities/benevole.entity'

export class PosteEntity implements Poste {
    constructor(partial: Partial<PosteEntity>) {
        Object.assign(this, partial)
    }

    id: number

    nom: string

    referents: BenevoleEntity[]

    nbPlaces: number

    nbPlacesMax: number

    // TODO messages: MessageEntity[]

    espaces: Espace[]

    festivalYear: number
}