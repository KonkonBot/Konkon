import { pgTable, text } from "drizzle-orm/pg-core";

export type Locales = typeof locales;

export const locales = pgTable("locales", {
	userId: text("user_id"),
	guildId: text("guild_id"),
	locale: text("locale").default("en").primaryKey(),
});
