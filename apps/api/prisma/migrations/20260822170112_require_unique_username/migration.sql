-- Backfill usernames for existing users (added nullable in the previous
-- migration), derived from their display name, falling back to the local
-- part of their email if the name yields nothing usable. Duplicates get a
-- numeric suffix so the backfill can never fail on collision.
WITH base AS (
  SELECT
    id,
    NULLIF(regexp_replace(lower(name), '[^a-z0-9]+', '', 'g'), '') AS name_slug,
    NULLIF(regexp_replace(lower(split_part(email, '@', 1)), '[^a-z0-9._-]+', '', 'g'), '') AS email_slug
  FROM "admin_users"
  WHERE "username" IS NULL
),
candidate AS (
  SELECT id, COALESCE(name_slug, email_slug, 'user') AS base_username
  FROM base
),
numbered AS (
  SELECT
    id,
    base_username,
    ROW_NUMBER() OVER (PARTITION BY base_username ORDER BY id) AS rn
  FROM candidate
)
UPDATE "admin_users" u
SET "username" = CASE WHEN n.rn = 1 THEN n.base_username ELSE n.base_username || n.rn::text END
FROM numbered n
WHERE u.id = n.id;

-- Every row must now have a username before we can require it.
ALTER TABLE "admin_users" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex: Prisma's standard (case-sensitive) unique constraint, from
-- the `username String @unique` field in schema.prisma.
CREATE UNIQUE INDEX "admin_users_username_key" ON "admin_users"("username");

-- Postgres unique constraints are case-sensitive by default; usernames
-- differing only by case (npixadmin / NPIXAdmin) must still collide, so
-- enforce it separately with a case-insensitive functional index.
CREATE UNIQUE INDEX "admin_users_username_lower_key" ON "admin_users" (lower("username"));
