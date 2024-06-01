import { sql } from "drizzle-orm";
import type { PgInsertValue } from "drizzle-orm/pg-core";
import { db, schemas } from "..";
import { lower } from "../utils";

/**
 * Create a tag.
 * @param body The body of the tag.
 * @returns The created tag.
 */
export async function createTag(body: PgInsertValue<schemas.Tags>) {
	const [tags] = await db.insert(schemas.tags).values(body).returning();

	return tags;
}

/**
 * Get all tags.
 * @returns The tags.
 */
export async function getTags() {
	return await db.query.tags.findMany();
}

/**
 * Get a tag by name.
 * @param tagName The name of the tag.
 * @param guildId The guild ID.
 * @param ownerId The owner ID.
 * @returns The tag.
 */
export async function getTag(
	tagName: string,
	guildId: string | undefined,
	ownerId: string | undefined,
) {
	const result = await db.query.tags.findFirst({
		where: (t, { isNull, and, or, eq, isNotNull }) => {
			return and(
				eq(lower(t.name), tagName.toLowerCase()),
				or(
					and(
						isNull(t.guildId),
						eq(t.ownerId, ownerId || sql`null`),
						eq(t.guildId, guildId || sql`null`),
					),
					isNotNull(t.content),
				),
			);
		},
	});

	return result;
}
