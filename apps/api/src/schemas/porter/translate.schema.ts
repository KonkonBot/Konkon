import { t } from "elysia";

export const translateSchema = {
	body: t.Object({
		text: t.Union([t.String(), t.Array(t.String())]),
		from: t.Optional(t.String()),
		to: t.Union([t.String(), t.Array(t.String())]),
	}),
	response: t.Object({
		langs: t.Any(),
		translations: t.Array(
			t.Object({
				text: t.String(),
				to: t.String(),
				sentLen: t.Optional(
					t.Object({
						srcSentLen: t.Array(t.Number()),
						transSentLen: t.Array(t.Number()),
					}),
				),
				transliteration: t.Optional(
					t.Object({
						script: t.String(),
						text: t.String(),
					}),
				),
				alignment: t.Optional(t.Any()),
			}),
		),
		detectedLanguage: t.Optional(
			t.Object({
				language: t.String(),
				score: t.Number(),
			}),
		),
	}),
};
