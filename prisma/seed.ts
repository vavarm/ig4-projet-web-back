import { PrismaClient, EnumTailleTShirt, EnumRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const roundsOfHashingPassword = parseInt(process.env.ROUNDS_OF_HASHING)

async function main() {

    //// RESET ////

    await prisma.inscriptionFestival.deleteMany()
    await prisma.planningEspace.deleteMany()
    await prisma.benevole.deleteMany()
    await prisma.association.deleteMany()
    await prisma.espace.deleteMany()
    await prisma.poste.deleteMany()
    await prisma.creneauHoraire.deleteMany()
    await prisma.jour.deleteMany()
    await prisma.festival.deleteMany()

    // reset autoincrement
    await prisma.$executeRaw`ALTER SEQUENCE "Association_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "Benevole_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "Poste_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "Jour_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "CreneauHoraire_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "Espace_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "PlanningEspace_id_seq" RESTART WITH 1`

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

    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, roundsOfHashingPassword)

    const admin = await prisma.benevole.upsert({
        where: { email: 'admin@admin.com' },
        update: {},
        create: {
            nom: 'Admin name',
            prenom: 'Admin firstname',
            email: process.env.ADMIN_EMAIL,
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

    //// postes ////

    const poste1 = await prisma.poste.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nom: 'Accueil',
            festivalYear: festival1.year,
        },
    })
    console.log({ poste1 })

    const poste2 = await prisma.poste.upsert({
        where: { id: 2 },
        update: {},
        create: {
            nom: 'Animations jeux',
            festivalYear: festival1.year,
        },
    })
    console.log({ poste2 })

    const poste3 = await prisma.poste.upsert({
        where: { id: 3 },
        update: {},
        create: {
            nom: 'Accueil',
            festivalYear: festival2.year,
        },
    })
    console.log({ poste3 })

    const poste4 = await prisma.poste.upsert({
        where: { id: 4 },
        update: {},
        create: {
            nom: 'Animations jeux',
            festivalYear: festival2.year,
        },
    })
    console.log({ poste4 })

    //// jours ////

    const jour1 = await prisma.jour.upsert({
        where: { id: 1 },
        update: {},
        create: {
            label: 'Vendredi',
            numeroJour: 1,
            festivalYear: festival1.year,
        },
    })
    console.log({ jour1 })

    const jour2 = await prisma.jour.upsert({
        where: { id: 2 },
        update: {},
        create: {
            label: 'Samedi',
            numeroJour: 2,
            festivalYear: festival1.year,
        },
    })
    console.log({ jour2 })

    const jour3 = await prisma.jour.upsert({
        where: { id: 3 },
        update: {},
        create: {
            label: 'Vendredi',
            numeroJour: 1,
            festivalYear: festival2.year,
        },
    })
    console.log({ jour3 })

    const jour4 = await prisma.jour.upsert({
        where: { id: 4 },
        update: {},
        create: {
            label: 'Samedi',
            numeroJour: 2,
            festivalYear: festival2.year,
        },
    })
    console.log({ jour4 })

    //// creneaux horaire ////

    const creneau1 = await prisma.creneauHoraire.upsert({
        where: { id: 1 },
        update: {},
        create: {
            horaireDebutHeures: 8,
            horaireDebutMinutes: 0,
            horaireFinHeures: 9,
            horaireFinMinutes: 0,
            jourId: jour1.id,
        },
    })
    console.log({ creneau1 })

    const creneau2 = await prisma.creneauHoraire.upsert({
        where: { id: 2 },
        update: {},
        create: {
            horaireDebutHeures: 9,
            horaireDebutMinutes: 0,
            horaireFinHeures: 10,
            horaireFinMinutes: 0,
            jourId: jour1.id,
        },
    })
    console.log({ creneau2 })

    const creneau3 = await prisma.creneauHoraire.upsert({
        where: { id: 3 },
        update: {},
        create: {
            horaireDebutHeures: 10,
            horaireDebutMinutes: 0,
            horaireFinHeures: 11,
            horaireFinMinutes: 0,
            jourId: jour1.id,
        },
    })
    console.log({ creneau3 })

    const creneau4 = await prisma.creneauHoraire.upsert({
        where: { id: 4 },
        update: {},
        create: {
            horaireDebutHeures: 8,
            horaireDebutMinutes: 0,
            horaireFinHeures: 9,
            horaireFinMinutes: 0,
            jourId: jour2.id,
        },
    })
    console.log({ creneau4 })

    const creneau5 = await prisma.creneauHoraire.upsert({
        where: { id: 5 },
        update: {},
        create: {
            horaireDebutHeures: 9,
            horaireDebutMinutes: 0,
            horaireFinHeures: 10,
            horaireFinMinutes: 0,
            jourId: jour2.id,
        },
    })
    console.log({ creneau5 })

    const creneau6 = await prisma.creneauHoraire.upsert({
        where: { id: 6 },
        update: {},
        create: {
            horaireDebutHeures: 10,
            horaireDebutMinutes: 0,
            horaireFinHeures: 11,
            horaireFinMinutes: 0,
            jourId: jour2.id,
        },
    })
    console.log({ creneau6 })

    //// espaces ////

    const espace1 = await prisma.espace.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nom: 'Espace 1',
            nbPlacesMax: 3,
            posteId: poste1.id,
        },
    })
    console.log({ espace1 })

    const espace2 = await prisma.espace.upsert({
        where: { id: 2 },
        update: {},
        create: {
            nom: 'Espace 2',
            nbPlacesMax: 5,
            posteId: poste1.id,
        },
    })
    console.log({ espace2 })

    const espace3 = await prisma.espace.upsert({
        where: { id: 3 },
        update: {},
        create: {
            nom: 'Espace 3',
            nbPlacesMax: 3,
            posteId: poste2.id,
        },
    })
    console.log({ espace3 })

    const espace4 = await prisma.espace.upsert({
        where: { id: 4 },
        update: {},
        create: {
            nom: 'Espace 4',
            nbPlacesMax: 6,
            posteId: poste2.id,
        },
    })
    console.log({ espace4 })

    //// planningEspaces ////

    const planningEspace1 = await prisma.planningEspace.upsert({
        where: { id: 1 },
        update: {},
        create: {
            benevoleId: alice.id,
            espaceId: espace1.id,
            creneauHoraireId: creneau1.id,
            flexible: false,
        },
    })
    console.log({ planningEspace1 })

    const planningEspace2 = await prisma.planningEspace.upsert({
        where: { id: 2 },
        update: {},
        create: {
            benevoleId: alice.id,
            espaceId: espace2.id,
            creneauHoraireId: creneau2.id,
            flexible: false,
        },
    })
    console.log({ planningEspace2 })

    const planningEspace3 = await prisma.planningEspace.upsert({
        where: { id: 3 },
        update: {},
        create: {
            benevoleId: alice.id,
            espaceId: espace2.id,
            creneauHoraireId: creneau1.id,
            flexible: false,
        },
    })
    console.log({ planningEspace3 })

    const planningEspace4 = await prisma.planningEspace.upsert({
        where: { id: 4 },
        update: {},
        create: {
            benevoleId: louis.id,
            espaceId: espace2.id,
            creneauHoraireId: creneau1.id,
            flexible: false,
        },
    })
    console.log({ planningEspace4 })

    const planningEspace5 = await prisma.planningEspace.upsert({
        where: { id: 5 },
        update: {},
        create: {
            benevoleId: louis.id,
            espaceId: espace2.id,
            creneauHoraireId: creneau3.id,
            flexible: false,
        },
    })
    console.log({ planningEspace5 })
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })