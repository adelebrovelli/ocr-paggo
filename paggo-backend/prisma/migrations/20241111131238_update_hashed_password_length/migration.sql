/*
  Warnings:

  - You are about to alter the column `hashed_password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashed_password" SET DATA TYPE VARCHAR(60);
