-- AlterTable
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "is_comce_member" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "comce_member_number" TEXT;
