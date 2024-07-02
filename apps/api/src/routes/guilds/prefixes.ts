import { addPrefixes, getPrefixes } from "@seifato/db";
import type { App } from "#/index";
import { prefixesSchema } from "#/schemas/guilds/prefixes.schema";

export default (app: App) =>
	app.post(
		"/",
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
