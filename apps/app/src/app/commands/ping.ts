import { Declare, Command, type CommandContext } from "seyfert";

@Declare({
	name: "ping",
	description: "Show the ping between Discord and the bot",
})
export default class PingCommand extends Command {
	async run(ctx: CommandContext) {
		const ping = ctx.client.gateway.latency;

		await ctx.write({
			content: `Pong! \`${ping}ms\``,
		});
	}
}
