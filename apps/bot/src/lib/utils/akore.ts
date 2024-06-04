import { KonscriptTranspiler } from "@konkon/akore";
import type { CommandContext } from "seyfert";
import type { InteractionCreateBodyRequest } from "seyfert/lib/common";
import { avatarURL } from ".";

export const kscriptFunctions = { avatarURL };

const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

/**
 * Extracts kscript code from a message.
 * @param input The message content.
 */
export function extractKonscript(input: string) {
	const regex = /\{kscript:\s*([\s\S]*?)\}/;

	const match = input.match(regex);
	if (match) {
		return { content: input.replace(regex, ""), code: match[1] };
	}
	return null;
}

/**
 * Parses kscript code to a message.
 * @param ctx The command context.
 * @param content The message content.
 */
export const parseMessage = async (ctx: CommandContext, content: string) => {
	const kscript = extractKonscript(content);

	if (!kscript) {
		await ctx.editOrReply({ content });
		return;
	}

	const t = new KonscriptTranspiler();
	const result = t.toCode(kscript.code);

	const options: InteractionCreateBodyRequest = {
		...(kscript.content && { content: kscript.content }),
		embeds: [],
	};

	const params = {
		options,
		ctx,
		...kscriptFunctions,
	};

	const asyncFunc = new Function(...Object.keys(params), `return (async () => { ${result} })();`);

	console.log(result, options.embeds);

	await asyncFunc(...Object.values(params));

	return await ctx.editOrReply(options);
};
