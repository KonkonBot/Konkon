import { treaty } from "@elysiajs/eden";
import { apiApp } from "api";
import { Logger } from "seyfert";

export const elysiaApp = apiApp().listen(3080, () => {
	new Logger({ name: "[SERVICES]" }).info("API listening on port 3080");
});

export const api = treaty<typeof elysiaApp>("localhost:3080");
