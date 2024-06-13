import { addPrefixes, getPrefixes } from "@konkon/db";
import { Elysia } from "elysia";
import { prefixesSchema } from "#/schemas/guilds/prefixes.schema";

export const settingsRoute = new Elysia().post(
	"/prefixes",
	async ({ body: { prefixes }, params: { id: guildId } }) => {
		if (!prefixes) {
			const prefixes = await getPrefixes(guildId);
			return prefixes;
		}

		await addPrefixes(guildId, prefixes);
		return prefixes;
	},
	prefixesSchema,
);
