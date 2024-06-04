import { getTagsWhere } from "@konkon/db";
import {
	type CommandContext,
	Declare,
	Embed,
	LocalesT,
	Options,
	SubCommand,
	createStringOption,
} from "seyfert";

const options = {
	owner_id: createStringOption({
		description: "Search for tags owned by the given user.",
	}),
	guild_id: createStringOption({
		description: "Search for tags in the given server.",
	}),
};

@Declare({
	name: "list",
	description: "List all tags in the server or user.",
})
@Options(options)
@LocalesT(void 0, "commands.tags.list.description")
export default class TagsCreate extends SubCommand {
	async run(ctx: CommandContext<typeof options>) {
		const t = ctx.t.commands.tags.list.get(await ctx.locale());

		const {
			options: { guild_id, owner_id },
		} = ctx;

		const tags = await getTagsWhere(guild_id || ctx.guildId, owner_id);

		if (!tags.length) {
			return ctx.write({ content: t.errors.notFound(owner_id, guild_id) });
		}

		let description = "";
		for (const tag of tags) {
			description += `\n\n${tag.id}. **${tag.name}**\n${t.embed.fieldValue(tag)}`;
		}

		const embed = new Embed()
			.setTitle(t.embed.title)
			.setColor(0x26272f)
			.setDescription(description);

		return ctx.write({ embeds: [embed] });
	}
}
