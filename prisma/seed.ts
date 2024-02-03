import { PrismaClient, EnumTailleTShirt, EnumRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const roundsOfHashingPassword = parseInt(process.env.ROUNDS_OF_HASHING)

async function main() {

    //// RESET ////

    await prisma.association.deleteMany()
    await prisma.benevole.deleteMany()
    await prisma.festival.deleteMany()
    await prisma.inscriptionFestival.deleteMany()

    // reset autoincrement
    await prisma.$executeRaw`ALTER SEQUENCE "Association_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "Benevole_id_seq" RESTART WITH 1`

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

    const alicePassword = await bcrypt.hash('alicePassword', roundsOfHashingPassword)

    const alice = await prisma.benevole.upsert({
        where: { email: 'alice@alice.com' },
        update: {},
        create: {
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

    //// festivals ////

    const festival1 = await prisma.festival.upsert({
        where: { year: 2021 },
        update: {},
        create: {
            year: 2021,
        },
    })
    console.log({ festival1 })

    const festival2 = await prisma.festival.upsert({
        where: { year: 2022 },
        update: {},
        create: {
            year: 2022,
        },
    })
    console.log({ festival2 })

    //// inscriptions ////

    const inscription1 = await prisma.inscriptionFestival.upsert({
        where: { benevoleId_festivalYear: { benevoleId: alice.id, festivalYear: festival1.year } },
        update: {},
        create: {
            benevoleId: alice.id,
            festivalYear: festival1.year,
        },
    })
    console.log({ inscription1 })

    const inscription2 = await prisma.inscriptionFestival.upsert({
        where: { benevoleId_festivalYear: { benevoleId: louis.id, festivalYear: festival1.year } },
        update: {},
        create: {
            benevoleId: louis.id,
            festivalYear: festival1.year,
        },
    })
    console.log({ inscription2 })

    const inscription3 = await prisma.inscriptionFestival.upsert({
        where: { benevoleId_festivalYear: { benevoleId: louis.id, festivalYear: festival2.year } },
        update: {},
        create: {
            benevoleId: louis.id,
            festivalYear: festival2.year,
        },
    })
    console.log({ inscription3 })

}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })