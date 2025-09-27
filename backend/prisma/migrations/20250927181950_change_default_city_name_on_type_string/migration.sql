/*
  Warnings:

  - You are about to drop the column `defaultCityId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "defaultCityId",
ADD COLUMN     "defaultCityName" TEXT;
