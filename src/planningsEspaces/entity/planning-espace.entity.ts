import { PlanningEspace, Espace, CreneauHoraire } from '@prisma/client'
import { BenevoleEntity } from 'src/benevoles/entities/benevole.entity'

export class PlanningEspaceEntity implements PlanningEspace {
    constructor(partial: Partial<PlanningEspaceEntity>) {
        Object.assign(this, partial)
    }

    id: number

    espaceId: number

    espace: Espace

    benevoleId: number

    benevole: BenevoleEntity

    creneauHoraireId: number

    creneauHoraire: CreneauHoraire

    flexible: boolean
}
