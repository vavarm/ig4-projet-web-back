import { Benevole, EnumTailleTShirt, EnumHebergement, EnumRole, Poste, PlanningEspace, PlanningPoste } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { AssociationEntity } from 'src/associations/entities/association.entity'

export class BenevoleEntity implements Benevole {
    constructor(partial: Partial<BenevoleEntity>) {
        Object.assign(this, partial)
    }

    id: number

    nom: string

    prenom: string

    email: string

    @Exclude()
    password: string

    adressePostale: string

    codePostal: string

    ville: string

    telephone: string

    associations: AssociationEntity[]

    taille_tshirt: EnumTailleTShirt

    vegetarien: boolean

    hebergement: EnumHebergement

    role: EnumRole

    compteValide: boolean

    // TODO
    posteReferenceId: number | null
    posteReference: Poste | null

    // TODO
    planningsPostes: PlanningPoste[]


    // TODO
    planningsEspaces: PlanningEspace[]
}
