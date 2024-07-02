import { env } from "@seifato/config/env";
import { config } from "seyfert";

export default config.bot({
	token: env.DISCORD_APP_TOKEN,
	intents: ["Guilds", "MessageContent", "GuildMessages", "GuildMembers", "GuildPresences"],
	locations: {
		base: "src",
		output: "dist",
		langs: "locales",
		commands: "commands",
		events: "events",
		components: "components",
	},
});
