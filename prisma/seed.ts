import { PrismaClient, EnumTailleTShirt, EnumRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.benevole.upsert({
        where: { email: 'alice@alice.com' },
        update: {},
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
            hebergement: null,
            role: EnumRole.Benevole,
            compteValide: true,
            present: false,
        },
    })
    console.log({ alice })
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })