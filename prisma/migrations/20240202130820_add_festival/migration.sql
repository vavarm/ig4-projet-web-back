/*
  Warnings:

  - You are about to drop the `PlanningPoste` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Association` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `Jour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `festivalYear` to the `Poste` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlanningPoste" DROP CONSTRAINT "PlanningPoste_benevoleId_fkey";

-- DropForeignKey
ALTER TABLE "PlanningPoste" DROP CONSTRAINT "PlanningPoste_creneauHoraireId_fkey";

-- DropForeignKey
ALTER TABLE "PlanningPoste" DROP CONSTRAINT "PlanningPoste_posteId_fkey";

-- AlterTable
ALTER TABLE "Poste" ADD COLUMN     "festivalYear" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PlanningPoste";

-- CreateTable
CREATE TABLE "Festival" (
    "year" INTEGER NOT NULL,

    CONSTRAINT "Festival_pkey" PRIMARY KEY ("year")
);

-- CreateTable
CREATE TABLE "InscriptionFestival" (
    "benevoleId" INTEGER NOT NULL,
    "festivalYear" INTEGER NOT NULL,
    "present" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InscriptionFestival_pkey" PRIMARY KEY ("benevoleId","festivalYear")
);

-- CreateIndex
CREATE UNIQUE INDEX "Association_email_key" ON "Association"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Jour_label_key" ON "Jour"("label");

-- AddForeignKey
ALTER TABLE "Poste" ADD CONSTRAINT "Poste_festivalYear_fkey" FOREIGN KEY ("festivalYear") REFERENCES "Festival"("year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscriptionFestival" ADD CONSTRAINT "InscriptionFestival_benevoleId_fkey" FOREIGN KEY ("benevoleId") REFERENCES "Benevole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscriptionFestival" ADD CONSTRAINT "InscriptionFestival_festivalYear_fkey" FOREIGN KEY ("festivalYear") REFERENCES "Festival"("year") ON DELETE RESTRICT ON UPDATE CASCADE;
