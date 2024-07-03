import { AutoLoad, Command, Declare } from "seyfert";

@Declare({
	name: "tag",
	description: "Tag commands",
	contexts: ["BotDM", "Guild", "PrivateChannel"],
	integrationTypes: ["GuildInstall", "UserInstall"],
})
@AutoLoad()
export default class TagCommand extends Command {}
