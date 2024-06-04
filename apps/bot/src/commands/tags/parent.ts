import { schemas } from "@konkon/db";
import { AutoLoad, Command, Declare } from "seyfert";

const tags = schemas.tags;

@Declare({
	name: "tag",
	description: "Tag commands",
	contexts: ["BotDM", "Guild", "PrivateChannel"],
	integrationTypes: ["GuildInstall", "UserInstall"],
})
@AutoLoad()
export default class TagCommand extends Command {}
