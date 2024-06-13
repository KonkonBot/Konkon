import {
	type CommandContext,
	Declare,
	type GuildMember,
	Options,
	SubCommand,
	createUserOption,
} from "seyfert";

const options = {
	user: createUserOption({
		description: "The user.",
	}),
};

@Declare({
	name: "info",
	aliases: ["whois"],
	description: "...",
})
@Options(options)
export default class UserInfo extends SubCommand {
	async run(ctx: CommandContext<typeof options>) {
		const user = ctx.options.user ?? ctx.author;

		const { guildId } = ctx;

		let member: GuildMember | null = null;
		if (guildId) member = await ctx.client.members.fetch(guildId, user.id);

		// const embed = new Embed()
		// 	.setAuthor({ name: `@${user.name}`, iconUrl: user.avatarURL() })
		// 	.setDescription(`
		// 		**User:** ${user.tag}
		// 		**ID:** ${user.id}
		// 		**Created At:** ${user.createdAt}
		// 		${member ? `**Joined At:** ${member?.joinedAt}` : ""}
		// 	`)
		// 	.setThumbnail(user.avatarURL());

		// if (member) {
		// 	embed.addFields({
		// 		name: "Roles",
		// 		value: (await member.roles.list()).map((r) => `<@&${r.id}>`).join(", "),
		// 	});
		// }

		return ctx.write({ embeds: [embed] });
	}
}
