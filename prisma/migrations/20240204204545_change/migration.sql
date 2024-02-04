/*
  Warnings:

  - You are about to drop the column `nbPlaces` on the `Espace` table. All the data in the column will be lost.
  - Added the required column `nbPlacesMax` to the `Espace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Espace" DROP COLUMN "nbPlaces",
ADD COLUMN     "nbPlacesMax" INTEGER NOT NULL;
