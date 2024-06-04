import { AutoLoad, Command, Declare } from "seyfert";

@Declare({
	name: "user",
	description: "account command",
	contexts: ["BOT_DM", "GUILD", "PRIVATE_CHANNEL"],
	integrationTypes: ["GUILD_INSTALL", "USER_INSTALL"],
})
@AutoLoad()
export default class UserCommand extends Command {}
