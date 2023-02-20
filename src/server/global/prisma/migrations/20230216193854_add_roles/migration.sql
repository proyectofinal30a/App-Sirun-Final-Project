/*
  Warnings:

  - The `role` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('CLIENT', 'ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "role",
ADD COLUMN     "role" "roles" NOT NULL DEFAULT 'CLIENT';
