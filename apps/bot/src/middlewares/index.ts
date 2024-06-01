import { devMiddleware } from "./dev.middleware";
import { guildMiddleware } from "./guild.middleware";

export const middlewares = {
	developerOnly: devMiddleware,
	guildOnly: guildMiddleware,
};
