import { env } from "@seifato/config/env";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const client = new Pool({
	connectionString: env.DATABASE_URI,
});

const db = drizzle(client, { schema });

export * from "./utils";
export * from "./functions";
export { db, client as dbClient, schema as schemas };
