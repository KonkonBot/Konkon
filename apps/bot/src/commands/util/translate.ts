import { api } from "@seifato/services";
import { md } from "mdbox";
import {
	type CommandContext,
	Declare,
	Embed,
	Options,
	SubCommand,
	createStringOption,
} from "seyfert";

const translateOptions = {
	text: createStringOption({
		description: "Text to translate",
		required: true,
	}),
	to: createStringOption({
		description: "Language to translate to (add multiple separating by commas)",
		required: true,
	}),
	from: createStringOption({
		description: "Language to translate from (leave in blank to autodetect)",
		required: false,
	}),
};

@Declare({
	name: "translate",
	description: "Translate text to another language",
	contexts: ["BotDM", "Guild", "PrivateChannel"],
	integrationTypes: ["GuildInstall", "UserInstall"],
})
// @LocalesT(undefined, "commands.util.translate.description")
@Options(translateOptions)
export default class UtilTranslateCommand extends SubCommand {
	public async run(ctx: CommandContext<typeof translateOptions>) {
		const { text, to, from } = ctx.options;
		const formattedTarget = to.trim().split(/[\s,]+/g);

		const { data } = await api.porter.translate.post({
			text,
			to: formattedTarget,
			from,
		});

		const translations = data?.translations ?? [];

		const translationEmbed = new Embed()
			.setTitle(`Translated from \`${data?.detectedLanguage?.language ?? from}\` to \`${to}\``)
			.addFields(
				{
					name: data?.langs[data?.detectedLanguage?.language ?? from],
					value: md.codeBlock(text, "fix"),
				},
				...translations.map((t) => ({
					name: data?.langs[t.to],
					value: md.codeBlock(t.text, "fix"),
				})),
			);

		return ctx.editOrReply({
			embeds: [translationEmbed],
		});
	}
}
