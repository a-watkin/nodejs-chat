# Migration `20200711144252-init`

This migration has been generated by a-watkin at 7/11/2020, 2:42:52 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Profile" (
"id" SERIAL,
"name" text  NOT NULL ,
    PRIMARY KEY ("id"))
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200711144252-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,16 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Profile {
+  id Int @default(autoincrement()) @id
+  name String
+}
```


