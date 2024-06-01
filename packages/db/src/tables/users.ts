import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	userId: text("user_id").primaryKey(),
});
