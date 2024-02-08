import { Jeu } from '@prisma/client'

export class JeuEntity implements Jeu {
    constructor(partial: Partial<JeuEntity>) {
        Object.assign(this, partial)
    }

    idJeu: number

    nom: string

    auteur: string

    editeur: string

    nbJoueurs: string

    ageMin: string

    duree: string

    type: string

    notice: string

    mecanismes: string

    themes: string

    tags: string

    description: string

    image: string

    logo: string

    video: string
}