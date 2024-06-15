import { Competence, EscapeNode } from "akore";
import type { KonscriptTranspiler } from "../../../transpiler";

export class AuthorIDCompetence extends Competence<KonscriptTranspiler> {
	override readonly identifier = "seifato:authorID";
	override readonly pattern = /@(authorID)/;

	public resolve() {
		return new EscapeNode("ctx.author.id");
	}
}
