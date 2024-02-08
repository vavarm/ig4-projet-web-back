/*
  Warnings:

  - You are about to drop the `_EspaceToJeu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EspaceToJeu" DROP CONSTRAINT "_EspaceToJeu_A_fkey";

-- DropForeignKey
ALTER TABLE "_EspaceToJeu" DROP CONSTRAINT "_EspaceToJeu_B_fkey";

-- DropTable
DROP TABLE "_EspaceToJeu";

-- CreateTable
CREATE TABLE "EspaceJeu" (
    "id" SERIAL NOT NULL,
    "jeuId" INTEGER NOT NULL,
    "espaceId" INTEGER NOT NULL,

    CONSTRAINT "EspaceJeu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EspaceJeu_jeuId_espaceId_key" ON "EspaceJeu"("jeuId", "espaceId");

-- AddForeignKey
ALTER TABLE "EspaceJeu" ADD CONSTRAINT "EspaceJeu_jeuId_fkey" FOREIGN KEY ("jeuId") REFERENCES "Jeu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EspaceJeu" ADD CONSTRAINT "EspaceJeu_espaceId_fkey" FOREIGN KEY ("espaceId") REFERENCES "Espace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
