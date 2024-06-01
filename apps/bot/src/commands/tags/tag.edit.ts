import { getTag, getTags, updateTag } from "@konkon/db";
import {
	ActionRow,
	type CommandContext,
	Declare,
	LocalesT,
	Modal,
	Options,
	SubCommand,
	TextInput,
	createStringOption,
} from "seyfert";
import { TextInputStyle } from "seyfert/lib/types";

const options = {
	name: createStringOption({
		description: "The name of the tag.",
		autocomplete: async (interaction) => {
			const _select = await getTags();
			const select = _select.map((tag) => tag.name);
			const focus = interaction.getInput();
			return interaction.respond(
				select.filter((ch) => ch.includes(focus)).map((ch) => ({ name: ch, value: ch })),
			);
		},
		required: true,
	}),
	content: createStringOption({
		description: "The new content of the tag.",
	}),
};

@Declare({
	name: "edit",
	aliases: ["update"],
	description: "Edit an existing tag.",
	contexts: ["GUILD", "PRIVATE_CHANNEL"],
	integrationTypes: ["GUILD_INSTALL"],
})
@Options(options)
@LocalesT(void 0, "commands.tags.edit.description")
export default class TagsEdit extends SubCommand {
	async run(ctx: CommandContext<typeof options>) {
		const t = ctx.t.commands.tags.edit.get(await ctx.locale());

		const {
			options: { name, content },
		} = ctx;

		const tag = await getTag(name, ctx.guildId, ctx.author.id);

		if (!tag) {
			return ctx.write({ content: t.errorMessage(name), components: [] });
		}

		if (content) {
			await updateTag(tag.id, {
				content,
			});

			return ctx.write({ content: t.successMessage(name), components: [] });
		}

		const nameInput = new TextInput()
			.setCustomId("name")
			.setValue(name)
			.setStyle(TextInputStyle.Short)
			.setLabel(t.modal.name.label);

		const contentInput = new TextInput()
			.setCustomId("content")
			.setValue(tag.content || "")
			.setStyle(TextInputStyle.Paragraph)
			.setLabel(t.modal.content.label);

		const row = new ActionRow<TextInput>().setComponents([contentInput]);
		const row2 = new ActionRow<TextInput>().setComponents([nameInput]);

		const modal = new Modal()
			.setCustomId("updateTag.modal")
			.setTitle(t.modal.title)
			.setComponents([row, row2]);

		ctx.interaction.modal(modal);
	}
}
