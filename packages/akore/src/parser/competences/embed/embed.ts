import { Competence, type Token } from "akore";
import { EscapeNode } from "akore";
import { KonscriptTranspiler } from "../../transpiler";
import { EmbedImageCompetence } from "./image";

class EmbedChildCompetence extends Competence<KonscriptTranspiler> {
	override readonly identifier = "konkon:embed:child";
	override readonly pattern = /@(title|description)/;

	public resolve({ inside, match }: Token<true>) {
		const value = inside;
		return new EscapeNode(
			`${match[0].replace("@", "")}: ${this.transpiler.string(value).toCode()}`,
		);
	}
}

export class EmbedCompetence extends Competence<KonscriptTranspiler> {
	override readonly identifier = "konkon:embed";
	override readonly pattern = /\@embed/;

	public resolve({ inside }: Token<true>) {
		const t = new KonscriptTranspiler();
		t.declare(new EmbedChildCompetence(t));
		t.declare(new EmbedImageCompetence(t));

		return new EscapeNode(`(options.embeds ??= []).push({ ${t.sequence(inside).toCode()} })`);
	}
}
