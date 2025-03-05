-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_authorOpenId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "authorOpenId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_authorOpenId_fkey" FOREIGN KEY ("authorOpenId") REFERENCES "User"("openId") ON DELETE SET NULL ON UPDATE CASCADE;
