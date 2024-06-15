import { getTag, updateTag } from "@seifato/db";
import { ModalCommand, type ModalContext } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";

export default class UpdateTag extends ModalCommand {
	filter({ customId }: ModalContext) {
		return customId === "updateTag.modal";
	}

	async run({ interaction }: ModalContext) {
		const name = interaction.getInputValue("name", true);
		const content = interaction.getInputValue("content", true);

		const tag = await getTag(name, interaction.guildId, interaction.user.id);

		if (!tag) {
			return interaction.write({
				content: `Tag not found: \`${name}\``,
				flags: MessageFlags.Ephemeral,
			});
		}

		const updatedTag = await updateTag(tag.id, {
			content,
		});

		interaction.write({
			content: `Tag updated: \`${updatedTag.name}\``,
			flags: MessageFlags.Ephemeral,
		});
	}
}
