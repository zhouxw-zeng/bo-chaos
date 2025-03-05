/*
  Warnings:

  - You are about to drop the column `published` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "published";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "published",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'reviewing';
