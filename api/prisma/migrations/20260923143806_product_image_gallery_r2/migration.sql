/*
  Warnings:

  - You are about to drop the column `image` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `alt` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "image",
ADD COLUMN     "alt" TEXT NOT NULL,
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
