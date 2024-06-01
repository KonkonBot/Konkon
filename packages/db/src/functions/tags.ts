import { sql } from "drizzle-orm";
import type { PgInsertValue } from "drizzle-orm/pg-core";
import { db, schemas } from "..";
import { lower } from "../utils";

// schemas.Tags == typeof schemas.tags
export async function createTag(body: PgInsertValue<schemas.Tags>) {
	const [tags] = await db.insert(schemas.tags).values(body).returning();

	return tags;
}

export async function getTag(
	tagName: string,
	guildId: string | undefined,
	userId: string | undefined,
) {
	const result = await db.query.tags.findFirst({
		where: (t, { isNull, and, or, eq, isNotNull }) => {
			return and(
				eq(lower(t.name), tagName.toLowerCase()),
				or(
					and(
						isNull(t.guildId),
						eq(t.ownerId, userId || sql`null`),
						eq(t.guildId, guildId || sql`null`),
					),
					isNotNull(t.content),
				),
			);
		},
	});

	return result;
}
