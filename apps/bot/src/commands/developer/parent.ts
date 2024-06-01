import { AutoLoad, Command, Declare } from "seyfert";

@Declare({
	name: "dev",
	description: "dev commands",
	contexts: ["BOT_DM", "GUILD", "PRIVATE_CHANNEL"],
	integrationTypes: ["GUILD_INSTALL", "USER_INSTALL"],
})
@AutoLoad()
export default class DeveloperParent extends Command {}
