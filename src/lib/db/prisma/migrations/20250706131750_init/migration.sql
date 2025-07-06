/*
  Warnings:

  - You are about to drop the column `operations` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `operations` on the `Page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "operations";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "operations";
