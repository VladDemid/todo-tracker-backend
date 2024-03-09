/*
  Warnings:

  - You are about to drop the column `theme` on the `Todo` table. All the data in the column will be lost.
  - The `todo_type` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `test` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "theme",
ADD COLUMN     "test" BOOLEAN NOT NULL,
ADD COLUMN     "title" VARCHAR(63) NOT NULL,
DROP COLUMN "todo_type",
ADD COLUMN     "todo_type" TEXT;
