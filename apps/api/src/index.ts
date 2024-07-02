import { Elysia } from "elysia";
export type { Routes } from "./routes";

export const app = new Elysia()
	// .use(plugins)
	.listen(3080, () => console.log("API listening on port 3080"));

export type App = typeof app;
