import { KonscriptTranspiler } from "@konkon/akore";
import { md } from "mdbox";
import {
	type CommandContext,
	Declare,
	Embed,
	Middlewares,
	Options,
	SubCommand,
	createStringOption,
} from "seyfert";

const options = {
	code: createStringOption({
		description: "Code to transpile",
		required: true,
	}),
};

type OptionsType = typeof options;

@Declare({
	name: "akore",
	description: "Transpiles provided Konscript code to JavaScript",
})
@Options(options)
@Middlewares(["developerOnly"])
export default class Akore extends SubCommand {
	async run(ctx: CommandContext<OptionsType, never>) {
		const { author } = ctx;
		const { code } = ctx.options;

		if (ctx.member) await ctx.member.fetch();

		const embed = new Embed()
			.setAuthor({ name: author.tag, iconUrl: author.avatarURL() })
			.setTimestamp();

		let time = Date.now();
		const transpiler = new KonscriptTranspiler();

		const transformedCode = transpiler.toCode(code);

		time = Date.now() - time;

		embed.setFields([
			{
				name: "Input",
				value: md.codeBlock(code, "d"),
			},
			{
				name: "Result",
				value: md.codeBlock(transformedCode, "ts"),
			},
			{
				name: "Time",
				value: `\`${Math.floor(time)}ms\``,
				inline: true,
			},
		]);

		// await parseMessage(ctx, code);
		await ctx.write({ embeds: [embed] });
	}
}
