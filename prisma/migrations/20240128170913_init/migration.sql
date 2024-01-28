-- CreateEnum
CREATE TYPE "EnumTailleTShirt" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

-- CreateEnum
CREATE TYPE "EnumHebergement" AS ENUM ('PROPOSE', 'RECHERCHE');

-- CreateEnum
CREATE TYPE "EnumRole" AS ENUM ('Admin', 'Observateur', 'Benevole');

-- CreateTable
CREATE TABLE "Benevole" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adressePostale" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "taille_tshirt" "EnumTailleTShirt" NOT NULL,
    "vegetarien" BOOLEAN NOT NULL,
    "hebergement" "EnumHebergement",
    "role" "EnumRole" NOT NULL,
    "compteValide" BOOLEAN NOT NULL DEFAULT false,
    "present" BOOLEAN NOT NULL DEFAULT false,
    "posteReferenceId" INTEGER,

    CONSTRAINT "Benevole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Association" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poste" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Poste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jeu" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "editeur" TEXT NOT NULL,
    "nbJoueurs" TEXT NOT NULL,
    "recu" BOOLEAN NOT NULL,
    "lienSiteWeb" TEXT NOT NULL,
    "espaceId" INTEGER NOT NULL,

    CONSTRAINT "Jeu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Espace" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "nbPlaces" INTEGER NOT NULL,
    "posteId" INTEGER NOT NULL,

    CONSTRAINT "Espace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "posteId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "datePublication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jour" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Jour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreneauHoraire" (
    "id" SERIAL NOT NULL,
    "horaireDebutHeures" INTEGER NOT NULL,
    "horaireDebutMinutes" INTEGER NOT NULL,
    "horaireFinHeures" INTEGER NOT NULL,
    "horaireFinMinutes" INTEGER NOT NULL,
    "jourId" INTEGER NOT NULL,

    CONSTRAINT "CreneauHoraire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanningPoste" (
    "id" SERIAL NOT NULL,
    "posteId" INTEGER NOT NULL,
    "benevoleId" INTEGER NOT NULL,
    "creneauHoraireId" INTEGER NOT NULL,
    "flexible" BOOLEAN NOT NULL,

    CONSTRAINT "PlanningPoste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanningEspace" (
    "id" SERIAL NOT NULL,
    "espaceId" INTEGER NOT NULL,
    "benevoleId" INTEGER NOT NULL,
    "creneauHoraireId" INTEGER NOT NULL,
    "flexible" BOOLEAN NOT NULL,

    CONSTRAINT "PlanningEspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AssociationToBenevole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Benevole_email_key" ON "Benevole"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Association_nom_key" ON "Association"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "_AssociationToBenevole_AB_unique" ON "_AssociationToBenevole"("A", "B");

-- CreateIndex
CREATE INDEX "_AssociationToBenevole_B_index" ON "_AssociationToBenevole"("B");

-- AddForeignKey
ALTER TABLE "Benevole" ADD CONSTRAINT "Benevole_posteReferenceId_fkey" FOREIGN KEY ("posteReferenceId") REFERENCES "Poste"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jeu" ADD CONSTRAINT "Jeu_espaceId_fkey" FOREIGN KEY ("espaceId") REFERENCES "Espace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Espace" ADD CONSTRAINT "Espace_posteId_fkey" FOREIGN KEY ("posteId") REFERENCES "Poste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_posteId_fkey" FOREIGN KEY ("posteId") REFERENCES "Poste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreneauHoraire" ADD CONSTRAINT "CreneauHoraire_jourId_fkey" FOREIGN KEY ("jourId") REFERENCES "Jour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningPoste" ADD CONSTRAINT "PlanningPoste_posteId_fkey" FOREIGN KEY ("posteId") REFERENCES "Poste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningPoste" ADD CONSTRAINT "PlanningPoste_benevoleId_fkey" FOREIGN KEY ("benevoleId") REFERENCES "Benevole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningPoste" ADD CONSTRAINT "PlanningPoste_creneauHoraireId_fkey" FOREIGN KEY ("creneauHoraireId") REFERENCES "CreneauHoraire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningEspace" ADD CONSTRAINT "PlanningEspace_espaceId_fkey" FOREIGN KEY ("espaceId") REFERENCES "Espace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningEspace" ADD CONSTRAINT "PlanningEspace_benevoleId_fkey" FOREIGN KEY ("benevoleId") REFERENCES "Benevole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningEspace" ADD CONSTRAINT "PlanningEspace_creneauHoraireId_fkey" FOREIGN KEY ("creneauHoraireId") REFERENCES "CreneauHoraire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssociationToBenevole" ADD CONSTRAINT "_AssociationToBenevole_A_fkey" FOREIGN KEY ("A") REFERENCES "Association"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssociationToBenevole" ADD CONSTRAINT "_AssociationToBenevole_B_fkey" FOREIGN KEY ("B") REFERENCES "Benevole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
