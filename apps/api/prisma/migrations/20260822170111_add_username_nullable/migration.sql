-- AlterTable: add username as nullable first — existing rows get backfilled
-- in the next migration before the NOT NULL + unique constraints are added.
ALTER TABLE "admin_users" ADD COLUMN "username" TEXT;
