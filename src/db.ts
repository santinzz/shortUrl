import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN,
})

const adapter = new PrismaLibSQL(libsql);

export const db = new PrismaClient({ adapter }); 