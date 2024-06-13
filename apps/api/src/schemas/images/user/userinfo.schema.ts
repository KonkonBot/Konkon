import { t } from "elysia";

/**
 * ! I HATE THIS :D
 */

export const UserInfoSchema = {
	body: t.Object({
		user: t.Object({
			avatarUrl: t.String({
				format: `${/^https:\/\/cdn\.discordapp\.com\/avatars\/\d+\/[a-f0-9]{32}\.(?:jpg|jpeg|png|webp)(?:\?size=\d+&format=webp(&width=\d+&height=\d+)?)?$0/}`,
			}),
			name: t.String(),
		}),
	}),
};
