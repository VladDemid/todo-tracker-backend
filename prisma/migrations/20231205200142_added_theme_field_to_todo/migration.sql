/*
  Warnings:

  - Added the required column `theme` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "theme" VARCHAR(63) NOT NULL;
