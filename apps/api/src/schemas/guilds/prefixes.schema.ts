import { t } from "elysia";

export const prefixesSchema = {
	params: t.Object({
		id: t.String(),
	}),
	body: t.Partial(
		t.Object({
			prefixes: t.Array(t.String()),
		}),
	),
	response: t.Array(t.String()),
};
