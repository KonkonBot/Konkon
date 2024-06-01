import "dotenv/config";
import { konkonRoutes } from "api";
import { Elysia } from "elysia";
import { Logger } from "seyfert";
import { KonkonClient } from "./lib/structures/client";

export const konkonAPI = new Elysia()
	.use(konkonRoutes)
	.listen(3080, () =>
		new Logger({ name: "[API]", active: true }).info("API is listening on port 3080"),
	);

const client = new KonkonClient(konkonAPI);

client.start();
