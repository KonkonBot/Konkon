import { parser } from "@konkon/parser";
import {
	Client,
	type CommandContext,
	LimitedCollection,
	type MenuCommandContext,
	Message, type ParseClient, type ParseLocales,
	type UsingClient,
} from "seyfert";
import { HandleCommand } from "seyfert/lib/commands/handle";
import type defaultLocale from "./locales/en";

const konkon = new Client({
	commands: {
		prefix: () => ["kon"],
		reply: () => true,
	},
	allowedMentions: {
		parse: [],
	},
	context(message) {
		if (message instanceof Message && konkon.edits.has(message.id)) {
			return {
				messageResponse: konkon.edits.get(message.id)!,
			};
		}
		return {};
	},
}) as unknown as UsingClient;

konkon.setServices({
	// @ts-expect-error IDE bug
	handleCommand: class extends HandleCommand {
		argsParser = parser();
	},
	langs: {
		default: "en",
		aliases: {
			es: ["es-ES", "es-419"],
		},
	},
});

konkon.edits = new LimitedCollection({
	expire: 15e3,
	resetOnDemand: true,
});
konkon.start().then(() => konkon.uploadCommands());

konkon.commands!.onCommand = (instance) => {
	const command = new instance();
	const oldRun = command.run?.bind(command);
	command.run = async (
		ctx: CommandContext<any> & MenuCommandContext<any, never>,
	) => {
		const result = await oldRun?.(ctx);
		if (
			result instanceof Message &&
			"message" in ctx
		) {
			konkon.edits.set(ctx.message.id, result);
		}
	};
	return command;
};