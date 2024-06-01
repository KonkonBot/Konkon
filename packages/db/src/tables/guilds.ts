import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const guilds = pgTable("guilds", {
	guildId: text("guild_id").primaryKey(),
	prefixes: text("prefixes").array().notNull().default(sql`ARRAY[]::text[]`),
});
