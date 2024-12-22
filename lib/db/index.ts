import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http"

neonConfig.fetchConnectionCache = true;
const sqlURL = process.env.DATABASE_URL

if (!sqlURL) {
    throw new Error('Missing DATABASE_URL environment variable');
}

const sql = neon(sqlURL)

export const db = drizzle(sql)