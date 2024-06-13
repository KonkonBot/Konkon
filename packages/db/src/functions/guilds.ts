import { _, db, schemas } from "..";

export async function getGuildOrCreate(id: string) {
	const guild = await db.query.guilds
		.findFirst({
			where: (table, { eq }) => eq(table.guildId, id),
		})
		.execute();

	if (!guild) return await createGuild(id);

	return guild;
}

export async function createGuild(guildId: string) {
	const [guild] = await db
		.insert(schemas.guilds)
		.values({
			guildId,
		})
		.returning();

	return guild;
}

export async function getPrefixes(guildId: string) {
	const guild = await getGuildOrCreate(guildId);
	return guild.prefixes;
}

export async function addPrefixes(guildId: string, newPrefixes: string[]) {
	const prefixes = await getPrefixes(guildId);

	prefixes.push(...newPrefixes);

	const [updatedGuild] = await db
		.update(schemas.guilds)
		.set({
			prefixes: prefixes,
		})
		.where(_.eq(schemas.guilds.guildId, guildId))
		.returning();

	return updatedGuild;
}

export async function removePrefixes(guild_id: string, prefixes: string[]) {
	const guild = await getGuildOrCreate(guild_id);

	guild.prefixes = guild.prefixes.filter((prefix) => !prefixes.includes(prefix));

	const [updatedGuild] = await db
		.update(schemas.guilds)
		.set({
			prefixes: guild.prefixes,
		})
		.where(_.eq(schemas.guilds.guildId, guild_id))
		.returning();

	return updatedGuild;
}
