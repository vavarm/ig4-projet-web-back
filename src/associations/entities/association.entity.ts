import { Association } from '@prisma/client'
import { BenevoleEntity } from 'src/benevoles/entities/benevole.entity'

export class AssociationEntity implements Association {
    constructor(partial: any) {
        Object.assign(this, partial)
    }

    id: number

    nom: string

    email: string
}
