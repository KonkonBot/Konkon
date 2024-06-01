import { schemas } from "@konkon/db";
import { AutoLoad, Command, Declare } from "seyfert";

const tags = schemas.tags;

@Declare({
	name: "tag",
	description: "tag command :3",
	contexts: ["BOT_DM", "GUILD", "PRIVATE_CHANNEL"],
	integrationTypes: ["GUILD_INSTALL", "USER_INSTALL"],
})
@AutoLoad()
export default class TagCommand extends Command {}
