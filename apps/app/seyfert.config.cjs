const { env } = require("@konkon/env");
const { config } = require("seyfert");

module.exports = config.bot({
	token: env.DISCORD_APP_TOKEN,
	intents: ["GuildMembers", "Guilds", "MessageContent", "GuildMessages"],
	locations: {
		base: "src",
		output: "dist",
		commands: "commands",
	},
	debug: env.NODE_ENV === "development",
});
