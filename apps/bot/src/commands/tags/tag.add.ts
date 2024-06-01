import { createTag } from "@konkon/db";
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
	}),
	content: createStringOption({
		description: "The content of the tag.",
	}),
};

@Declare({
	name: "add",
	aliases: ["create"],
	description: "Create a new tag. :D",
	contexts: ["GUILD", "PRIVATE_CHANNEL"],
	integrationTypes: ["GUILD_INSTALL"],
})
@Options(options)
@LocalesT(void 0, "commands.tags.add.description")
export default class TagsCreate extends SubCommand {
	async run(ctx: CommandContext<typeof options>) {
		const t = ctx.t.commands.tags.add.get(await ctx.locale());

		const {
			options: { name, content },
		} = ctx;

		if (name && content) {
			await createTag({
				name,
				content,
				guildId: ctx.interaction.guildId,
				ownerId: ctx.interaction.user.id,
			});

			return ctx.write({ content: t.successMessage(name), components: [] });
		}

		const nameInput = new TextInput()
			.setCustomId("name")
			.setStyle(TextInputStyle.Short)
			.setLabel(t.modal.name.label);
		const contentInput = new TextInput()
			.setCustomId("content")
			.setStyle(TextInputStyle.Paragraph)
			.setLabel(t.modal.content.label);
		content && contentInput.setValue(content);

		const row1 = new ActionRow<TextInput>().setComponents([nameInput]);
		const row2 = new ActionRow<TextInput>().setComponents([contentInput]);

		const modal = new Modal()
			.setCustomId("@Modal_createTag")
			.setTitle(t.modal.title)
			.setComponents([row1, row2]);

		ctx.interaction.modal(modal);
	}
}
