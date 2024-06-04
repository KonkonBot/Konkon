import { Competence, EscapeNode, type Token } from "akore";
import type { KonscriptTranspiler } from "../../transpiler";

export class EmbedImageCompetence extends Competence<KonscriptTranspiler> {
	override readonly identifier = "konkon:embed:image";
	override readonly pattern = /@(image|thumbnail)/;

	public resolve({ inside, match }: Token<true>) {
		const value = inside;
		console.log(typeof value, value);
		return new EscapeNode(
			`${match[0].replace("@", "")}: { url: ${this.transpiler.string(value).toCode()} }`,
		);
	}
}
