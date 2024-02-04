import { InscriptionFestival } from '@prisma/client'
import { BenevoleEntity } from 'src/benevoles/entities/benevole.entity'
import { FestivalEntity } from 'src/festivals/entities/festival.entity'

export class InscriptionEntity implements InscriptionFestival {
    constructor(partial: Partial<InscriptionEntity>) {
        Object.assign(this, partial)
    }

    benevoleId: number

    benevole: BenevoleEntity

    festivalYear: number

    festival: FestivalEntity

    present: boolean
}
