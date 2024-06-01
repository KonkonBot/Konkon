import { _, db, schemas } from "@konkon/db";
import Elysia, { t } from "elysia";

export const settingsRoute = new Elysia().post(
	"/settings",
	async ({ body, params: { id } }) => {
		const guild = await db.query.guilds
			.findFirst({
				where: (t, { eq }) => eq(t.guildId, id),
			})
			.execute();

		if (!guild)
			await db.insert(schemas.guilds).values({
				guildId: id,
			});

		const [updatedGuild] = await db
			.update(schemas.guilds)
			.set({ ...body })
			.where(_.eq(schemas.guilds.guildId, id))
			.returning()
			.execute();

		return updatedGuild;
	},
	{
		params: t.Object({
			id: t.String(),
		}),
		body: t.Object({
			prefixes: t.Array(t.String()),
			language: t.String(),
		}),
	},
);
