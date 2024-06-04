import { type CommandContext, Declare, Options, SubCommand, createUserOption } from "seyfert";

const options = {
	user: createUserOption({
		description: "The user.",
	}),
};

@Declare({
	name: "info",
	aliases: ["whois"],
	description: "..."
})
@Options(options)
export default class UserInfo extends SubCommand {
	async run(ctx: CommandContext<typeof options>) {
		// TODO: WIP
	}
}
