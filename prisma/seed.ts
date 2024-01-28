import { PrismaClient, EnumTailleTShirt, EnumRole } from '@prisma/client'
import { AssociationEntity } from 'src/associations/entities/association.entity'

const prisma = new PrismaClient()

async function main() {

    //// RESET ////

    await prisma.association.deleteMany()
    await prisma.benevole.deleteMany()

    //// associations ////

    const asso1 = await prisma.association.upsert({
        where: { nom: 'Association 1' },
        update: {},
        create: {
            nom: 'Association 1',
            email: 'asso1@asso1.com',
        },
    })
    console.log({ asso1 })
    const asso2 = await prisma.association.upsert({
        where: { nom: 'Association 2' },
        update: {},
        create: {
            nom: 'Association 2',
            email: 'asso2@asso2.com',
        },
    })
    console.log({ asso2 })

    //// benevoles ////

    const alice = await prisma.benevole.upsert({
        where: { email: 'alice@alice.com' },
        update: {
            nom: 'Dupont',
            prenom: 'Alice',
            email: 'alice@alice.com',
            password: 'alice',
            adressePostale: '1 rue de la Paix',
            codePostal: '75000',
            ville: 'Paris',
            telephone: '0123456789',
            taille_tshirt: EnumTailleTShirt.M,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Benevole,
            compteValide: true,
            present: false,
            associations:
            {
                connect: [{ id: asso1.id }, { id: asso2.id }]
            }
        },
        create: {
            nom: 'Dupont',
            prenom: 'Alice',
            email: 'alice@alice.com',
            password: 'alice',
            adressePostale: '1 rue de la Paix',
            codePostal: '75000',
            ville: 'Paris',
            telephone: '0123456789',
            taille_tshirt: EnumTailleTShirt.M,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Benevole,
            compteValide: true,
            present: false,
            associations:
            {
                connect: [{ id: asso1.id }, { id: asso2.id }]
            }
        },
    })
    console.log({ alice })
    const louis = await prisma.benevole.upsert({
        where: { email: 'louis@louis.com' },
        update: {
            nom: 'Dupont',
            prenom: 'Louis',
            email: 'louis@louis.com',
            password: 'louis',
            adressePostale: '1 rue de la Paix',
            codePostal: '75000',
            ville: 'Paris',
            telephone: '0123456789',
            taille_tshirt: EnumTailleTShirt.M,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Benevole,
            compteValide: false,
            present: false,
            associations:
            {
                connect: [{ id: asso1.id }]
            }
        },
        create: {
            nom: 'Dupont',
            prenom: 'Louis',
            email: 'louis@louis.com',
            password: 'louis',
            adressePostale: '1 rue de la Paix',
            codePostal: '75000',
            ville: 'Paris',
            telephone: '0123456789',
            taille_tshirt: EnumTailleTShirt.M,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Benevole,
            compteValide: false,
            present: false,
            associations:
            {
                connect: [{ id: asso1.id }]
            }
        },
    })
    console.log({ louis })
    const admin = await prisma.benevole.upsert({
        where: { email: 'admin@admin.com' },
        update: {
            nom: 'Admin name',
            prenom: 'Admin firstname',
            email: 'admin@admin.com',
            password: 'admin',
            adressePostale: 'Admin address',
            codePostal: 'Admin postal code',
            ville: 'Admin city',
            telephone: '000000000',
            taille_tshirt: EnumTailleTShirt.L,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Admin,
            compteValide: true,
            present: false,
        },
        create: {
            nom: 'Admin name',
            prenom: 'Admin firstname',
            email: 'admin@admin.com',
            password: 'admin',
            adressePostale: 'Admin address',
            codePostal: 'Admin postal code',
            ville: 'Admin city',
            telephone: '000000000',
            taille_tshirt: EnumTailleTShirt.L,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Admin,
            compteValide: true,
            present: false,
        },
    })
    console.log({ admin })

}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })