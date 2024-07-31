import { parser } from "@konkon/parser";
import { Client, type ParseClient } from "seyfert";

const konkon = new Client({
	commands: {
		prefix: () => ["kon"],
	},
	allowedMentions: {
		parse: [],
	},
});

konkon.start().then(async () => {
	konkon.uploadCommands().then(() => {
		// @ts-ignore
		konkon.handleCommand.argsParser = parser();
	});
});

declare module "seyfert" {
	interface UsingClient extends ParseClient<Client<true>> {}
}
