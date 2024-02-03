/*
  Warnings:

  - A unique constraint covering the columns `[label,festivalYear]` on the table `Jour` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numeroJour,festivalYear]` on the table `Jour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numeroJour` to the `Jour` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Jour_label_key";

-- AlterTable
ALTER TABLE "Jour" ADD COLUMN     "numeroJour" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Jour_label_festivalYear_key" ON "Jour"("label", "festivalYear");

-- CreateIndex
CREATE UNIQUE INDEX "Jour_numeroJour_festivalYear_key" ON "Jour"("numeroJour", "festivalYear");
