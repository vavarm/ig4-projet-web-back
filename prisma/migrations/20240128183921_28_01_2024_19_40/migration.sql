/*
  Warnings:

  - Made the column `hebergement` on table `Benevole` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "EnumHebergement" ADD VALUE 'AUCUN';

-- AlterTable
ALTER TABLE "Benevole" ALTER COLUMN "hebergement" SET NOT NULL;
