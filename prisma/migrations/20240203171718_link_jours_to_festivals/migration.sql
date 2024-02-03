/*
  Warnings:

  - Added the required column `festivalYear` to the `Jour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jour" ADD COLUMN     "festivalYear" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Jour" ADD CONSTRAINT "Jour_festivalYear_fkey" FOREIGN KEY ("festivalYear") REFERENCES "Festival"("year") ON DELETE RESTRICT ON UPDATE CASCADE;
