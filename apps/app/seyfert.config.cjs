const { env } = require("@konkon/env");
const { config } = require("seyfert");

module.exports = config.bot({
	token: env.DISCORD_APP_TOKEN,
	intents: ["GuildMembers", "Guilds", "MessageContent", "GuildMessages"],
	locations: {
		base: "src",
		output: env.NODE_ENV === "development" ? "src" : "dist",
		commands: "/app/commands",
		events: "/app/events",
		langs: "/locales"
	},
	debug: env.NODE_ENV === "development",
});
