# Migration `20200628153248-public-private----shared`

This migration has been generated by nonissue at 6/28/2020, 3:32:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Late" DROP COLUMN "private",
ADD COLUMN "shared" boolean  NOT NULL DEFAULT false;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200628153018-rename-private----public-to-avoid-reserved-keyword..20200628153248-public-private----shared
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -34,9 +34,9 @@
 model Late {
   id          Int      @id @default(autoincrement())
   title       String?
-  public      Boolean  @default(false)
+  shared      Boolean  @default(false)
   url         String?
   tags        Tag[]    @relation(references: [id])
   description String?
   owner       User?    @relation(fields: [ownerId], references: [id])
```

