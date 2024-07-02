import { langs, translate } from "microsoft-translate-api";
import type { App } from "#/index";
import { translateSchema } from "#/schemas/porter/translate.schema";

export default (app: App) =>
	app.post(
		"",
		async ({ body: { text, from, to } }) => {
			const [result] = (await translate(text, from, to)) || [];

			return {
				langs: langs.default,
				...result,
			};
		},
		translateSchema,
	);
