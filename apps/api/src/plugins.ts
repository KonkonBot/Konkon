import { logger } from "@bogeychan/elysia-logger";
import Elysia from "elysia";
import { autoload } from "elysia-autoload";
import compression from "elysia-compress";

export const plugins = new Elysia()
	.use(
		compression({
			as: "scoped",
		}),
	)
	.use(
		logger({
			level: "error",
			transport: {
				target: "pino-pretty",
				options: {
					colorize: true,
				},
			},
		}),
	)
	.use(await autoload({ types: { output: "routes.ts", useExport: true } }));
