import { Festival } from '@prisma/client'
import { Poste } from '@prisma/client'


export class FestivalEntity implements Festival {
    constructor(partial: Partial<FestivalEntity>) {
        Object.assign(this, partial)
    }

    year: number

    postes: Poste[]
}
