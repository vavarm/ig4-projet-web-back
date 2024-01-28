import { Association } from '@prisma/client'

export class AssociationEntity implements Association {
    constructor(partial: Partial<AssociationEntity>) {
        Object.assign(this, partial)
    }

    id: number

    nom: string

    email: string
}
