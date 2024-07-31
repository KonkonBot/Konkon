import {
	Command,
	type CommandContext,
	Declare,
	Options,
	createUserOption,
} from "seyfert";

const options = {
	user: createUserOption({
		description: "The user to wave at",
		required: false,
	}),
};

@Declare({
	name: "wave",
	description: "Wave a user (or yourself)",
	aliases: ["hi", "hello"],
})
@Options(options)
export default class WaveCommand extends Command {
	async run(ctx: CommandContext<typeof options>) {
		const { user } = ctx.options;

		await ctx.write({
			content: `Hello ${user?.toString() ?? "me"}!`,
		});
	}
}
