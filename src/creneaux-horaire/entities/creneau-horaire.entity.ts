import { CreneauHoraire, Jour, PlanningEspace } from '@prisma/client'

export class CreneauHoraireEntity implements CreneauHoraire {
    constructor(partial: Partial<CreneauHoraireEntity>) {
        Object.assign(this, partial)
    }

    id: number

    horaireDebutHeures: number

    horaireDebutMinutes: number

    horaireFinHeures: number

    horaireFinMinutes: number

    jour: Jour

    jourId: number

    planningEspaces: PlanningEspace[]
}