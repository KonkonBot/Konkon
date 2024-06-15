import { Competence, EscapeNode, type Token, splitInside } from "akore";
import type { KonscriptTranspiler } from "../../../transpiler";

export class UserAvatarCompetence extends Competence<KonscriptTranspiler> {
	override readonly identifier = "seifato:userAvatar";
	override readonly pattern = /@(userAvatar)/;

	public resolve({ inside }: Token<boolean>) {
		if (inside) {
			const [userID, size, format] = splitInside(inside);

			return new EscapeNode(
				`await avatarURL(ctx, ${
					userID ? this.transpiler.string(userID).toCode() : null
				}, {size: ${this.transpiler.number(size).toCode()}, format: "${format}"})`,
			);
		}

		return new EscapeNode("await avatarURL(ctx, ctx.author.id)");
	}
}
