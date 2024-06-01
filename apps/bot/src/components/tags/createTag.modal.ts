import { createTag } from "@konkon/db";
import { ModalCommand, type ModalContext } from "seyfert";

export default class CreateTag extends ModalCommand {
	filter(interaction: ModalContext) {
		return interaction.customId === "createTag.modal";
	}

	async run({ interaction, guildId, author: { id: ownerId } }: ModalContext) {
		const name = interaction.getInputValue("name", true);
		const content = interaction.getInputValue("content", true);

		const tags = await createTag({
			name,
			content,
			guildId,
			ownerId,
		});

		return await interaction.write({
			content: JSON.stringify(tags),
		});
	}
}
