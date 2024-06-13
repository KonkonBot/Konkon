import "dotenv/config";
import { env } from "@konkon/config/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/schema.ts",
	out: "./src/migrations",
	dbCredentials: {
		url: env.DATABASE_URI,
	},
});
