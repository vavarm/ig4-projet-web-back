import { Espace, PlanningEspace } from '@prisma/client'

export class EspaceEntity implements Espace {
    constructor(partial: Partial<EspaceEntity>) {
        Object.assign(this, partial)
    }

    id: number

    nom: string

    currentNbPlaces: number

    nbPlaces: number

    posteId: number

    planningEspaces: PlanningEspace[]
}