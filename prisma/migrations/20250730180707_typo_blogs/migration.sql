/*
  Warnings:

  - You are about to drop the column `Category` on the `Blogs` table. All the data in the column will be lost.
  - You are about to drop the column `Thumbnail` on the `Blogs` table. All the data in the column will be lost.
  - Added the required column `category` to the `Blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Blogs" DROP COLUMN "Category",
DROP COLUMN "Thumbnail",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;
