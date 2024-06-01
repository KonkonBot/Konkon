import { treaty } from "@elysiajs/eden";
import { getLocale } from "@konkon/db";
import { extendContext } from "seyfert";
import type { konkonAPI } from "../../index";

export const KonkonContext = extendContext((ctx) => {
	return {
		developers: {
			"@chewawi": "852970774067544165",
			"@mentallyillbassist": "788869971073040454",
			"@kingbcats": "1125490330679115847",
		},
		api: treaty<typeof konkonAPI>("localhost:3080"),
		locale: getLocale(ctx),
	};
});
