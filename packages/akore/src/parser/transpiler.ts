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
		return this.registry.resolve(new Program(...this.resolve(code)));
	}
}
