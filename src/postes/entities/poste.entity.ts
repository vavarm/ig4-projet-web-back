import { Poste } from '@prisma/client'
import { BenevoleEntity } from 'src/benevoles/entities/benevole.entity'
import { FestivalEntity } from 'src/festivals/entities/festival.entity'

export class PosteEntity implements Poste {
    constructor(partial: Partial<PosteEntity>) {
        Object.assign(this, partial)
    }

    id: number

    nom: string

    referents: BenevoleEntity[]

    // TODO messages: MessageEntity[]

    // TODO espaces: EspaceEntity[]

    festivalYear: number

    festival: FestivalEntity
}