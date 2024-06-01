import { Client } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const client = new Client({
	connectionString:
		"postgresql://dbot_owner:86grDJWKNTMj@ep-shrill-surf-a5jsg8xd.us-east-2.aws.neon.tech/dbot?sslmode=require",
});

const db = drizzle(client, { schema });

export * from "./utils";
export * from "./functions";
export { db, client as dbClient, schema as schemas };
