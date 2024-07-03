import { Client } from "@neondatabase/serverless";
import { env } from "@seifato/env";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./tables/schema";

export const client = new Client({
	connectionString: env.DATABASE_URI,
});

export const db = drizzle(client, { schema });

export * from "./utils";
export * from "./functions";
export { schema };
