import "dotenv/config";
import { config } from "seyfert";

if (!process.env.BOT_TOKEN) {
	throw new Error("BOT_TOKEN is missing");
}

export default config.bot({
	token: process.env.BOT_TOKEN,
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
