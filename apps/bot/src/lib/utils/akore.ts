// ! AKORE BUG

// import { KonscriptTranspiler } from "@konkon/akore";
// import type { CommandContext } from "seyfert";
// import { avatarURL } from ".";

// export const kscriptFunctions = { avatarURL };

// const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

// /**
//  * Extracts kscript code from a message.
//  * @param input The message content.
//  */
// export function extractKonscript(input: string) {
// 	const regex = /\{kscript:\s*([\s\S]*?)\}/;

// 	const match = input.match(regex);
// 	if (match) {
// 		return { content: input.replace(regex, ""), code: match[1] };
// 	}
// 	return null;
// }

// /**
//  * Executes kscript code in a message.
//  * @param ctx The command context.
//  * @param code The kscript code.
//  * @param content The message content.
//  */
// export const executeKonscript = async (ctx: CommandContext, code: string, content?: string) => {
// 	const t = new KonscriptTranspiler();
// 	const result = t.toCode(code);

// 	console.log(result);

// 	const options = {
// 		...(content && { content: content }),
// 		embeds: [],
// 	};

// 	const params = {
// 		options,
// 		ctx,
// 		...kscriptFunctions,
// 	};

// 	const asyncFunc = new Function(...Object.keys(params), `return (async () => { ${result} })();`);

// 	await asyncFunc(...Object.values(params));

// 	await ctx.editOrReply(options);
// 	return result;
// };

// /**
//  * Parses kscript code to a message.
//  * @param ctx The command context.
//  * @param content The message content.
//  */
// export const parseMessage = async (ctx: CommandContext, content: string) => {
// 	const kscript = extractKonscript(content);

// 	if (!kscript) {
// 		await ctx.editOrReply({ content });
// 		return;
// 	}

// 	executeKonscript(ctx, kscript.code, kscript.content);
// };
