# Migration `20200627223635-author----owner`

This migration has been generated by nonissue at 6/27/2020, 10:36:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Late" DROP CONSTRAINT IF EXiSTS "Late_authorId_fkey",
DROP COLUMN "authorId",
ADD COLUMN "ownerId" integer   ;

ALTER TABLE "public"."Late" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200627223448-published----private..20200627223635-author----owner
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
@@ -38,10 +38,10 @@
   private     Boolean  @default(false)
   url         String?
   tags        Tag[]    @relation(references: [id])
   description String?
-  author      User?    @relation(fields: [authorId], references: [id])
-  authorId    Int?
+  owner       User?    @relation(fields: [ownerId], references: [id])
+  ownerId     Int?
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
 }
```


