/*
  Warnings:

  - Made the column `timezone` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "times" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "timezone" SET NOT NULL;
