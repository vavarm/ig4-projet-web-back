/*
  Warnings:

  - The primary key for the `Jeu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Jeu` table. All the data in the column will be lost.
  - You are about to drop the column `lienSiteWeb` on the `Jeu` table. All the data in the column will be lost.
  - You are about to drop the column `recu` on the `Jeu` table. All the data in the column will be lost.
  - You are about to drop the column `titre` on the `Jeu` table. All the data in the column will be lost.
  - Added the required column `aAnimer` to the `EspaceJeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recu` to the `EspaceJeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ageMin` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auteur` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duree` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idJeu` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mecanismes` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notice` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themes` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Jeu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `Jeu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EspaceJeu" DROP CONSTRAINT "EspaceJeu_jeuId_fkey";

-- AlterTable
ALTER TABLE "EspaceJeu" ADD COLUMN     "aAnimer" TEXT NOT NULL,
ADD COLUMN     "recu" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Jeu" DROP CONSTRAINT "Jeu_pkey",
DROP COLUMN "id",
DROP COLUMN "lienSiteWeb",
DROP COLUMN "recu",
DROP COLUMN "titre",
ADD COLUMN     "ageMin" TEXT NOT NULL,
ADD COLUMN     "auteur" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duree" TEXT NOT NULL,
ADD COLUMN     "idJeu" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "mecanismes" TEXT NOT NULL,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "notice" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL,
ADD COLUMN     "themes" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL,
ADD CONSTRAINT "Jeu_pkey" PRIMARY KEY ("idJeu");

-- AddForeignKey
ALTER TABLE "EspaceJeu" ADD CONSTRAINT "EspaceJeu_jeuId_fkey" FOREIGN KEY ("jeuId") REFERENCES "Jeu"("idJeu") ON DELETE RESTRICT ON UPDATE CASCADE;
