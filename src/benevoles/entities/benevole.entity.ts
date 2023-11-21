import { Benevole, EnumTailleTShirt, EnumHebergement, EnumRole } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class BenevoleEntity implements Benevole {
    constructor(partial: Partial<BenevoleEntity>) {
        Object.assign(this, partial)
    }

    id: string

    nom: string

    prenom: string

    email: string

    @Exclude()
    password: string

    adressePostale: string

    codePostal: string

    ville: string

    telephone: string

    // TODO association: AssociationEntity[]
    associations: Buffer[]
    associationIds: string[]

    taille_tshirt: EnumTailleTShirt

    vegetarien: boolean

    hebergement: EnumHebergement

    role: EnumRole

    compteValide: boolean

    present: boolean

    // TODO posteReference: PosteEntity
    posteReference: Buffer
    posteReferenceId: string

    // TODO planningsPostes: PlanningPosteEntity[]
    planningsPostes: Buffer[]

    // TODO planningsEspaces: PlanningEspaceEntity[]
    planningsEspaces: Buffer[]
}
