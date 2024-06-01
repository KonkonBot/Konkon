import { sql } from "drizzle-orm";
import {
	type PgColumn,
	bigint,
	check,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	unique,
	varchar,
} from "drizzle-orm/pg-core";

export type Tags = typeof tags;

export const tags = pgTable(
	"tags",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 200 }).notNull(),
		content: varchar("content", { length: 2000 }).notNull(),
		ownerId: text("owner_id"),
		guildId: text("guild_id"),
		uses: integer("uses").default(0),
		createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		pointsTo: bigint("points_to", { mode: "number" }).references((): PgColumn => tags.id, {
			onDelete: "cascade",
		}),
	},
	(tags) => ({
		uniqueNameGuildId: unique().on(tags.name, tags.guildId),
		checkContentOrPointsTo: check(
			"tags_mutually_excl_cnt_p_to",
			sql`
			(("content" IS NOT NULL) AND "points_to" IS NULL)
         OR ("points_to" IS NOT NULL AND "content" IS NULL)`,
		),
	}),
);
