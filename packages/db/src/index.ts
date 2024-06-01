import { env } from "@konkon/config/env";
import { Client } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const client = new Client({
	connectionString: env.DATABASE_URL,
});

const db = drizzle(client, { schema });

export * from "./utils";
export * from "./functions";
export { db, client as dbClient, schema as schemas };
