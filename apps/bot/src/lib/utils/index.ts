/*
 * under construction :3
 */

import type { CommandContext } from "seyfert";
import type { ImageOptions } from "seyfert/src/common";

/**
 * Slices a string to a maximum length.
 * @param text The string to slice.
 * @param max The maximum length of the sliced string.
 * @returns The sliced string.
 */
export const sliceText = (text: string, max = 100) =>
	text.length > max ? `${text.slice(0, max)}...` : text;

/**
 * Gets the avatar URL for a user.
 * @param ctx The command context.
 * @param user The user ID to get the avatar URL for.
 * @param options The image options.
 * @returns The user's avatar URL.
 */
export async function avatarURL(
	ctx: CommandContext,
	user: string | null,
	options: ImageOptions = {},
) {
	options.size ??= 2048;
	try {
		const fetchedUser = user ? await ctx.client.users.fetch(user) : null;
		return fetchedUser?.avatarURL(options) ?? ctx.author.avatarURL(options);
	} catch (error) {
		return ctx.author.avatarURL(options);
	}
}
