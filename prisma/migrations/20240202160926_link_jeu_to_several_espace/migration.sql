/*
  Warnings:

  - You are about to drop the column `espaceId` on the `Jeu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Jeu" DROP CONSTRAINT "Jeu_espaceId_fkey";

-- AlterTable
ALTER TABLE "Jeu" DROP COLUMN "espaceId";

-- CreateTable
CREATE TABLE "_EspaceToJeu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EspaceToJeu_AB_unique" ON "_EspaceToJeu"("A", "B");

-- CreateIndex
CREATE INDEX "_EspaceToJeu_B_index" ON "_EspaceToJeu"("B");

-- AddForeignKey
ALTER TABLE "_EspaceToJeu" ADD CONSTRAINT "_EspaceToJeu_A_fkey" FOREIGN KEY ("A") REFERENCES "Espace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EspaceToJeu" ADD CONSTRAINT "_EspaceToJeu_B_fkey" FOREIGN KEY ("B") REFERENCES "Jeu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
