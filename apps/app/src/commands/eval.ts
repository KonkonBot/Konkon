import { ParserConfig } from "@konkon/parser";
import {
	Command,
	type CommandContext,
	Declare,
	Options,
	createBooleanOption,
	createStringOption,
} from "seyfert";

const options = {
	code: createStringOption({
		description: "Code to send",
		required: false,
	}),
	async: createBooleanOption({
		description: "Run the code in async?",
	}),
};

@Declare({
	name: "eval",
	description: "Evaluates code",
})
@Options(options)
@ParserConfig({
	quotes: [
		["```ts", "```"],
		["```", "```"],
	],
	debug: true,
})
export default class WaveCommand extends Command {
	async run(ctx: CommandContext<typeof options>) {
		const { code } = ctx.options;

		await ctx.write({
			content: code,
		});
	}
}
