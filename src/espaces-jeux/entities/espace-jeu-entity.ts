import { EspaceJeu, Jeu, Espace } from '@prisma/client'

export class EspaceJeuEntity implements EspaceJeu {
    constructor(partial: Partial<EspaceJeuEntity>) {
        Object.assign(this, partial)
    }

    id: number

    jeu: Jeu

    jeuId: number

    espace: Espace

    espaceId: number

    aAnimer: string

    recu: string
}