/*
  Warnings:

  - A unique constraint covering the columns `[nom,festivalYear]` on the table `Poste` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Poste_nom_festivalYear_key" ON "Poste"("nom", "festivalYear");
