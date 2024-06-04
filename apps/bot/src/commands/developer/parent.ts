import { AutoLoad, Command, Declare, Middlewares } from "seyfert";

@Declare({
	name: "dev",
	description: "Developer commands (for devs only :3)",
	contexts: ["BotDM", "Guild", "PrivateChannel"],
	integrationTypes: ["GuildInstall", "UserInstall"],
})
@AutoLoad()
@Middlewares(["developerOnly"])
export default class DeveloperParent extends Command {}
