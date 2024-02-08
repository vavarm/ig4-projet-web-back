/*
  Warnings:

  - A unique constraint covering the columns `[nom,posteId]` on the table `Espace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Espace_nom_posteId_key" ON "Espace"("nom", "posteId");
