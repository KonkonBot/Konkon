import { JavaScriptTranspiler, Program } from "akore";
import * as competences from "./competences";

export class KonscriptTranspiler extends JavaScriptTranspiler {
	constructor() {
		super();
		for (const competence of Object.values(competences)) {
			this.declare(new competence(this));
		}
	}
	toCode(code: string): string {
		let content = code;
		for (const token of this.lexer.tokenize(code)) {
			content =
				code.slice(0, token.match.index) + code.slice(token.match.index + token.total.length);
		}
		content = code.trim();

		console.log("RESULT:", content, "CODE:", code);

		return this.registry.resolve(new Program(...this.resolve(code)));
	}
}
