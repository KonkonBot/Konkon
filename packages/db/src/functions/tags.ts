import { type InferSelectModel, eq, sql } from "drizzle-orm";
import type { PgInsertValue, PgUpdateSetSource } from "drizzle-orm/pg-core";
import { db, schema } from "..";
import type { Tags } from "../tables/tags";
import { type ReturnTypeFromSelect, type SelectColumns, lower } from "../utils";

/**
 * Create a tag.
 * @param body The body of the tag.
 * @returns The created tag.
 */
export async function createTag(body: PgInsertValue<Tags>) {
	const [tags] = await db.insert(schema.tags).values(body).returning();

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
 * Get all tags where guildId and ownerId are defined.
 * When ownerId is null, return all tags with the given guildId.
 * When guildId is null or ownerId is not null, return all tags with the given ownerId.
 * @param guildId The guild ID.
 * @param ownerId The owner ID.
 * @returns The tags.
 */
export async function getTagsWhere(guildId: string | undefined, ownerId: string | undefined) {
	return await db.query.tags.findMany({
		where: (t, { eq }) => {
			if (!ownerId) {
				return eq(t.guildId, guildId || sql`null`);
			}
			return eq(t.ownerId, ownerId);
		},
	});
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

/**
 * Update a tag.
 * @param id The ID of the tag to update.
 * @param body The updated fields of the tag.
 * @returns The updated tag.
 */
export async function updateTag(id: number, body: PgUpdateSetSource<Tags>) {
	const [updatedTag] = await db
		.update(schema.tags)
		.set(body)
		.where(eq(schema.tags.id, id))
		.returning();

	return updatedTag;
}

/**
 * Delete a tag.
 * @param id The ID of the tag to delete.
 */
export async function deleteTag(id: number) {
	await db.delete(schema.tags).where(eq(schema.tags.id, id));
}

/**
 * Increment the uses of a tag.
 * @param id The ID of the tag.
 */
export async function updateUses(id: number) {
	await db
		.update(schema.tags)
		.set({ uses: sql`${sql.raw("uses")} + 1` })
		.where(eq(schema.tags.id, id));
}

/**
 * Search tags.
 * @param query The query to search for.
 * @returns The tags.
 */
export async function searchTags<T extends InferSelectModel<Tags>, S extends SelectColumns<T>>(
	query: string,
	select?: S,
): Promise<ReturnTypeFromSelect<T, S>[]> {
	return (await db.query.tags.findMany({
		columns: select,
		where: (t, { ilike }) => ilike(t.name, `%${query}%`),
	})) as [];
}
