import path from "node:path";
import { config } from "dotenv";
import { z } from "zod";

config({
	path: path.join(__dirname, "../../../.env"),
});

const envSchema = z.object({
	/**
	 * The discord app token
	 */
	DISCORD_APP_TOKEN: z.string(),
	/**
	 * The database URI
	 */
	DATABASE_URI: z.string(),
	/**
	 * The environment the app is running in
	 */
	NODE_ENV: z.literal("development").or(z.literal("production")).optional(),
});

type Env = z.infer<typeof envSchema>;

/**
 * The environment variables
 */
export const env: Env = envSchema.parse(process.env);

for (const key in env) {
	if (!(key in env)) {
		throw new Error(`Missing env variable: ${key}`);
	}
}
