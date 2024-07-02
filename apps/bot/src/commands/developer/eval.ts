import { inspect } from "node:util";
import { md } from "mdbox";
import {
	type CommandContext,
	Declare,
	Embed,
	Options,
	SubCommand,
	createBooleanOption,
	createNumberOption,
	createStringOption,
} from "seyfert";
import { EmbedColors } from "seyfert/lib/common";
import { sliceText } from "../../lib/utils";

const options = {
	code: createStringOption({
		description: "Code to evaluate",
		required: true,
	}),
	async: createBooleanOption({
		description: "Run asynchronously",
		required: false,
	}),
	depth: createNumberOption({
		description: "Inspection depth",
		min_value: -1,
		max_value: 100,
		required: false,
	}),
};

type OptionsType = typeof options;

@Declare({
	name: "eval",
	description: "Evaluates provided JavaScript code",
})
@Options(options)
export default class EvalCommand extends SubCommand {
	async run(ctx: CommandContext<OptionsType, never>) {
		const { author } = ctx;
		const { code, async, depth } = ctx.options;

		if (ctx.member) await ctx.member.fetch();

		const embed = new Embed()
			.setAuthor({ name: author.tag, iconUrl: author.avatarURL() })
			.setTimestamp();

		let output: any = null;
		let timeStart = Date.now();

		try {
			timeStart = Date.now();

			const functionBody = async ? `(async (ctx) => { ${code} })(ctx)` : `(ctx) => { ${code} }`;
			const func = new Function("ctx", functionBody);
			output = await func(ctx);

			let inspectedOutput = inspect(output, { depth: depth ?? 0 });
			inspectedOutput = inspectedOutput?.replaceAll(ctx.client.rest.options.token, "[APP_TOKEN]");

			const timeExec = Date.now() - timeStart;

			embed
				.setColor(EmbedColors.DiscordDark)
				.setDescription(`${md.codeBlock(sliceText(inspectedOutput, 1900), "ts")}`)
				.addFields(
					{
						name: "Type",
						value: `\`${typeof output}\``,
						inline: true,
					},
					{
						name: "Evaluated in",
						value: `\`${Math.floor(timeExec)}ms\``,
						inline: true,
					},
				);

			await ctx.write({ embeds: [embed] });
		} catch (error) {
			const timeExec = Date.now() - timeStart;

			embed
				.setColor(EmbedColors.Red)
				.setDescription("An error occurred while trying to evaluate.")
				.addFields(
					{
						name: "Type",
						value: `${typeof output}`,
						inline: true,
					},
					{
						name: "Evaluated in",
						value: `\`${Math.floor(timeExec)}ms\``,
						inline: true,
					},
					{
						name: "Input",
						value: sliceText(md.codeBlock(code, "ts"), 1024),
					},
					{
						name: "Output",
						value: `${md.codeBlock(sliceText(`${error}`, 1900), "ts")}`,
					},
				);

			await ctx.write({ embeds: [embed] });
		}
	}
}
