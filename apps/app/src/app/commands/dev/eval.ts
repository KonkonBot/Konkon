import { ParserConfig } from "@konkon/parser";
import {
	Command,
	type CommandContext,
	createBooleanOption,
	createNumberOption,
	createStringOption,
	Declare,
	IgnoreCommand,
	Options,
} from "seyfert";
import { inspect } from "node:util";

const FAKE_TOKEN = "MTEyMDg3NzkzNzc2NDM0ODAwNA.01cb00a934.4495d1e2d01273dde5e731e2d24bf5e2b84ac0b4b34acb90d31f018296d2160ada6dc12d7039"

const options = {
	code: createStringOption({
		description: "Code to evaluate.",
	}),
	async: createBooleanOption({
		description: "Run the code in async?",
	}),
	depth: createNumberOption({
		description: "Depth of the output code.",
	}),
};

@Declare({
	name: "eval",
	ignore: IgnoreCommand.Slash,
	description: "Evaluates code",
})
@Options(options)
@ParserConfig({
	quotes: [
		["```ts", "```"],
		["```js", "```"],
		["```", "```"],
	],
})
export default class EvalCommand extends Command {
	async run(ctx: CommandContext<typeof options>) {
		let { code, async, depth } = ctx.options;

		if (!code) return await ctx.write({ content: "y el code pa?" });

		const containsReturn = code
			.split("\n")
			.some((line) => line.trim().startsWith("return"));
		if (!containsReturn) {
			code = `return (${code});`;
		}

		const eval_context = { ctx, message: ctx.message, member: ctx.member };

		console.log(code);
		const fn = new Function(
			...Object.keys(eval_context),
			async
				? `return (async () => {\n${code}\n})();`
				: `return (() => {\n${code}\n})();`,
		);

		let executed = performance.now();

		const result = await fn(...Object.values(eval_context));

		executed = performance.now() - executed;

		let output = inspect(result, { depth: depth });
		output = output.length > 1800 ? `${output.slice(0, 1800)}...` : output;

		const tokenRegex = new RegExp(ctx.client.rest.options.token, "g");
		output = output.replace(tokenRegex, FAKE_TOKEN);

		return await ctx.editOrReply({
			content: `-# ~ executed in ${Math.floor(executed)}ms \n\`\`\`ts\n${output}\`\`\``,
		});
	}

	async onRunError(ctx: CommandContext, error: unknown) {
		return await ctx.write({
			content: `-# ~ error occurred \n\`\`\`ts\n${String(error).slice(0, 1800)}\`\`\``,
		});
	}
}
