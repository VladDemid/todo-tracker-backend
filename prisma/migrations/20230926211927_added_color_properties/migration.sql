/*
  Warnings:

  - Added the required column `color_hex` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Color" ADD COLUMN     "color_hex" VARCHAR(15) NOT NULL,
ADD COLUMN     "description" VARCHAR(15) NOT NULL;
