import Elysia from "elysia";
import { langs, translate } from "microsoft-translate-api";
import { translateSchema } from "#/schemas/porter/translate.schema";

export const translateRoute = new Elysia().post(
	"/translate",
	async ({ body: { text, from, to } }) => {
		const [result] = (await translate(text, from, to)) || [];

		return {
			langs: langs.default,
			...result,
		};
	},
	translateSchema,
);
