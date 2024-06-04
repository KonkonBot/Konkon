import { AutoLoad, Command, Declare } from "seyfert";

@Declare({
	name: "user",
	description: "User commands",
	contexts: ["BotDM", "Guild", "PrivateChannel"],
	integrationTypes: ["GuildInstall", "UserInstall"],
})
@AutoLoad()
export default class UserParent extends Command {}
