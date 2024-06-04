/*
 * under construction :3
 */

export const sliceText = (text: string, max = 100) =>
	text.length > max ? `${text.slice(0, max)}...` : text;
