import { Festival } from '@prisma/client'
import { Poste, Jour } from '@prisma/client'


export class FestivalEntity implements Festival {
    constructor(partial: Partial<FestivalEntity>) {
        Object.assign(this, partial)
    }

    year: number

    jours: Jour[]

    postes: Poste[]
}
