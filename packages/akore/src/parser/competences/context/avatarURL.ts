import { Competence, EscapeNode, type Token } from "akore";
import type { KonscriptTranspiler } from "../../transpiler";

export class AvatarURLCompetence extends Competence<KonscriptTranspiler> {
	override readonly identifier = "konkon:avatarURL";
	override readonly pattern = /@(avatarURL|avatar|avatarUrl)/;

	public resolve({ inside }: Token<true>) {
		const value = inside ? this.transpiler.string(inside).toCode() : null;

		return new EscapeNode(`await avatarURL(ctx, ${value})`);
	}
}
