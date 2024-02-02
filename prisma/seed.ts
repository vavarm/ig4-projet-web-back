import { PrismaClient, EnumTailleTShirt, EnumRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const roundsOfHashingPassword = parseInt(process.env.ROUNDS_OF_HASHING)

async function main() {

    //// RESET ////

    await prisma.association.deleteMany()
    await prisma.benevole.deleteMany()

    //// associations ////

    const asso1 = await prisma.association.upsert({
        where: { nom: 'Association 1' },
        update: {},
        create: {
            id: 1,
            nom: 'Association 1',
            email: 'asso1@asso1.com',
        },
    })
    console.log({ asso1 })
    const asso2 = await prisma.association.upsert({
        where: { nom: 'Association 2' },
        update: {},
        create: {
            id: 2,
            nom: 'Association 2',
            email: 'asso2@asso2.com',
        },
    })
    console.log({ asso2 })

    //// benevoles ////

    const alicePassword = await bcrypt.hash('alicePassword', roundsOfHashingPassword)

    const alice = await prisma.benevole.upsert({
        where: { email: 'alice@alice.com' },
        update: {},
        create: {
            id: 1,
            nom: 'Dupont',
            prenom: 'Alice',
            email: 'alice@alice.com',
            password: alicePassword,
            adressePostale: '1 rue de la Paix',
            codePostal: '75000',
            ville: 'Paris',
            telephone: '0123456789',
            taille_tshirt: EnumTailleTShirt.M,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Benevole,
            compteValide: true,
            associations:
            {
                connect: [{ id: asso1.id }, { id: asso2.id }]
            }
        },
    })
    console.log({ alice })

    const louisPassword = await bcrypt.hash('louisPassword', roundsOfHashingPassword)

    const louis = await prisma.benevole.upsert({
        where: { email: 'louis@louis.com' },
        update: {},
        create: {
            id: 2,
            nom: 'Dupont',
            prenom: 'Louis',
            email: 'louis@louis.com',
            password: louisPassword,
            adressePostale: '1 rue de la Paix',
            codePostal: '75000',
            ville: 'Paris',
            telephone: '0123456789',
            taille_tshirt: EnumTailleTShirt.M,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Benevole,
            compteValide: false,
            associations:
            {
                connect: [{ id: asso1.id }]
            }
        },
    })
    console.log({ louis })

    const adminPassword = await bcrypt.hash('adminPassword', roundsOfHashingPassword)

    const admin = await prisma.benevole.upsert({
        where: { email: 'admin@admin.com' },
        update: {},
        create: {
            id: 3,
            nom: 'Admin name',
            prenom: 'Admin firstname',
            email: 'admin@admin.com',
            password: adminPassword,
            adressePostale: 'Admin address',
            codePostal: 'Admin postal code',
            ville: 'Admin city',
            telephone: '000000000',
            taille_tshirt: EnumTailleTShirt.L,
            vegetarien: false,
            hebergement: "AUCUN",
            role: EnumRole.Admin,
            compteValide: true,
        },
    })
    console.log({ admin })

}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })