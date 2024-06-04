import { KonscriptTranspiler } from "@konkon/akore";
import type { CommandContext } from "seyfert";

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

	if (!kscript) return await ctx.editOrReply({ content });

	const t = new KonscriptTranspiler();
	const result = t.toCode(kscript.code);

	const options = {
		...(kscript.content ? { content: kscript.content } : null),
		embeds: [],
	};

	new Function(result).bind(options)();

	return await ctx.editOrReply(options);
};
