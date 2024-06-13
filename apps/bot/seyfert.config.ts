import { env } from "@konkon/config/env";
import { config } from "seyfert";

export default config.bot({
	token: env.DISCORD_APP_TOKEN,
	intents: ["Guilds", "MessageContent", "GuildMessages", "GuildMembers", "GuildPresences"],
	locations: {
		base: "src",
		output: "src",
		langs: "locales",
		commands: "commands",
		events: "events",
		components: "components",
	},
});
