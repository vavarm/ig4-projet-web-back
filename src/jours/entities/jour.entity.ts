import { CreneauHoraire, Jour } from '@prisma/client'

export class JourEntity implements Jour {
    constructor(partial: Partial<JourEntity>) {
        Object.assign(this, partial)
    }

    id: number

    label: string

    numeroJour: number

    creneauxHoraire: CreneauHoraire[]

    festivalYear: number
}