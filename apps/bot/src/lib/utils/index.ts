/*
 * under construction :3
 */

import type { CommandContext } from "seyfert";

export const sliceText = (text: string, max = 100) =>
	text.length > max ? `${text.slice(0, max)}...` : text;

/**
 * Get the avatar URL of a user
 * @param ctx The command context
 * @param user The user to get the avatar URL of
 * @returns The avatar URL of the user
 */
export async function avatarURL(ctx: CommandContext, user: string | null) {
	try {
		const fetchedUser = user ? await ctx.client.users.fetch(user) : null;
		return fetchedUser?.avatarURL() ?? ctx.author.avatarURL();
	} catch (error) {
		return ctx.author.avatarURL();
	}
}
