import { Festival } from '@prisma/client'
/* TODO
import { PosteEntity } from 'src/postes/entities/poste.entity'
*/

export class FestivalEntity implements Festival {
    constructor(partial: Partial<FestivalEntity>) {
        Object.assign(this, partial)
    }

    year: number

    /* TODO
    postes: PosteEntity[];
    */
}
