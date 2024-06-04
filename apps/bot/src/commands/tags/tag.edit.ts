import { getTag, type schemas, searchTags, updateTag } from "@konkon/db";
import type { InferSelectModel } from "drizzle-orm";
import {
	ActionRow,
	type CommandContext,
	Declare,
	LocalesT,
	Modal,
	type OKFunction,
	Options,
	SubCommand,
	TextInput,
	createStringOption,
} from "seyfert";
import { TextInputStyle } from "seyfert/lib/types";

const options = {
	tag: createStringOption({
		description: "The tag to edit.",
		autocomplete: async (interaction) => {
			const select = await searchTags(interaction.getInput(), { name: true });
			return interaction.respond(select.map((tag) => ({ name: tag.name, value: tag.name })));
		},
		value: async (data, ok: OKFunction<InferSelectModel<schemas.Tags>>, fail) => {
			const tag = await getTag(data.value, data.context.guildId, data.context.author.id);
			if (tag) ok(tag);
			return fail("notFound");
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
})
@Options(options)
@LocalesT(void 0, "commands.tags.edit.description")
export default class TagsEdit extends SubCommand {
	async onRunError(ctx: CommandContext<typeof options>, error: string) {
		if (error === "notFound") {
			return ctx.write({
				content: ctx.t.commands.tags.edit
					.get(await ctx.locale())
					.errorMessage(ctx.options.tag.name),
				components: [],
			});
		}
	}
	async run(ctx: CommandContext<typeof options>) {
		const t = ctx.t.commands.tags.edit.get(await ctx.locale());

		const {
			options: { tag, content },
		} = ctx;

		if (content) {
			await updateTag(tag.id, {
				content,
			});

			return ctx.write({ content: t.successMessage(tag.name), components: [] });
		}

		const nameInput = new TextInput()
			.setCustomId("name")
			.setValue(tag.name)
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
