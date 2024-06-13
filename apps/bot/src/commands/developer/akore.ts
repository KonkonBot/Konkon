// ! AKORE BUG

// import { type CommandContext, Declare, Options, SubCommand, createStringOption } from "seyfert";
// import { executeKonscript } from "#lib/utils/akore";

// const options = {
// 	code: createStringOption({
// 		description: "Code to transpile",
// 		required: true,
// 	}),
// };

// @Declare({
// 	name: "akore",
// 	description: "Transpiles provided Konscript code to JavaScript",
// })
// @Options(options)
// export default class Akore extends SubCommand {
// 	async run(ctx: CommandContext<typeof options, never>) {
// 		const { code } = ctx.options;

// 		await executeKonscript(ctx, code);
// 	}
// }
